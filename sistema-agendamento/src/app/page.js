'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import StatCard from '../components/StatCard/StatCard';
import Calendar from '../components/Calendar/Calendar';
import Modal from '../components/Modal/Modal';
import styles from '../components/StatCard/StatCard.module.css';

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  // Função para sincronizar com Google Calendar
  const syncWithGoogle = async () => {
    setSyncing(true);
    try {
      const response = await fetch('/api/calendar/sync-events');
      if (response.ok) {
        const { events } = await response.json();
        
        // Buscar eventos deletados localmente
        const deletedEvents = JSON.parse(localStorage.getItem('deletedGoogleEvents') || '[]');
        
        // Converter eventos do Google para o formato do sistema
        const googleAppointments = events
          .filter(event => {
            // Filtrar apenas eventos de consulta
            if (!event.summary || !event.summary.startsWith('Consulta - ')) {
              return false;
            }
            // Ignorar eventos que foram deletados localmente
            if (deletedEvents.includes(event.id)) {
              return false;
            }
            return true;
          })
          .map(event => {
            const patientName = event.summary.replace('Consulta - ', '');
            const startDate = new Date(event.start.dateTime || event.start.date);
            
            return {
              id: event.id, // Usar o ID do Google diretamente
              patient: patientName,
              date: startDate,
              status: 'confirmed',
              notes: event.description || '',
              googleEventId: event.id,
              source: 'google'
            };
          });

        // Buscar agendamentos locais (que não estão no Google)
        const localAppointments = JSON.parse(localStorage.getItem('appointments') || '[]')
          .map(apt => ({
            ...apt,
            date: new Date(apt.date),
            source: apt.source || 'local'
          }))
          .filter(apt => !apt.googleEventId); // Apenas agendamentos sem vínculo com Google

        // Combinar: eventos do Google + agendamentos locais sem vínculo
        const mergedAppointments = [...googleAppointments, ...localAppointments];
        
        setAppointments(mergedAppointments);
        localStorage.setItem('appointments', JSON.stringify(mergedAppointments));
        
        console.log('✅ Sincronizado:', mergedAppointments.length, 'eventos');
      }
    } catch (error) {
      console.error('❌ Erro ao sincronizar:', error);
    } finally {
      setSyncing(false);
    }
  };

  // Carregar agendamentos ao iniciar
  useEffect(() => {
    const initializeAppointments = async () => {
      await syncWithGoogle();
      setLoading(false);
    };

    initializeAppointments();
  }, []);

  // Sincronizar periodicamente (a cada 5 minutos)
  useEffect(() => {
    if (loading) return;

    const interval = setInterval(syncWithGoogle, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [loading]);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const handleSaveAppointment = async (formData) => {
    const dateStr = formData.get('date');
    const timeStr = formData.get('time');
    const [year, month, day] = dateStr.split('-').map(Number);
    const [hours, minutes] = timeStr.split(':').map(Number);

    const appointmentDate = new Date(year, month - 1, day, hours, minutes);

    const newAppointment = {
      id: `temp-${Date.now()}`,
      patient: formData.get('patient'),
      date: appointmentDate,
      status: formData.get('status'),
      notes: formData.get('notes') || '',
      googleEventId: null,
      source: 'local'
    };

    // Adicionar ao estado local imediatamente
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    setShowNewAppointmentModal(false);

    try {
      // Enviar para o Google Calendar
      const response = await fetch('/api/calendar/create-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patient: newAppointment.patient,
          date: appointmentDate.toISOString(),
          notes: newAppointment.notes
        }),
      });

      if (response.ok) {
        const { eventId } = await response.json();
        
        // Atualizar o agendamento com o ID do Google
        const finalAppointment = {
          ...newAppointment,
          id: eventId,
          googleEventId: eventId,
          source: 'google'
        };
        
        const finalAppointments = updatedAppointments.map(apt => 
          apt.id === newAppointment.id ? finalAppointment : apt
        );
        
        setAppointments(finalAppointments);
        localStorage.setItem('appointments', JSON.stringify(finalAppointments));
        
        console.log('✅ Evento criado no Google Calendar!');
      } else {
        // Se falhar, manter como local
        localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
        console.error('❌ Erro ao criar no Google, mantido localmente');
      }
    } catch (error) {
      // Se falhar, manter como local
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
      console.error('❌ Erro na requisição, mantido localmente:', error);
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    const appointment = appointments.find(a => a.id === appointmentId);
    
    if (!appointment) {
      console.error('Agendamento não encontrado');
      return;
    }

    // Remover do estado local imediatamente
    const updatedAppointments = appointments.filter(a => a.id !== appointmentId);
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));

    // Se for um evento do Google, deletar lá também
    if (appointment.googleEventId) {
      try {
        // Marcar como deletado localmente
        const deletedEvents = JSON.parse(localStorage.getItem('deletedGoogleEvents') || '[]');
        deletedEvents.push(appointment.googleEventId);
        localStorage.setItem('deletedGoogleEvents', JSON.stringify(deletedEvents));

        const response = await fetch(`/api/calendar/delete-event?eventId=${appointment.googleEventId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
          console.log('✅ Evento deletado do Google Calendar!');
          // Remover da lista de deletados após confirmar exclusão
          setTimeout(() => {
            const currentDeleted = JSON.parse(localStorage.getItem('deletedGoogleEvents') || '[]');
            const filtered = currentDeleted.filter(id => id !== appointment.googleEventId);
            localStorage.setItem('deletedGoogleEvents', JSON.stringify(filtered));
          }, 30000); // Limpar após 30 segundos
        } else {
          console.error('❌ Erro ao deletar do Google Calendar');
        }
      } catch (error) {
        console.error('❌ Erro ao deletar do Google Calendar:', error);
      }
    }
  };

  // Calcular estatísticas
  const today = new Date();
  const getWeekStart = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const weekStart = getWeekStart(today);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);

  const todayCount = appointments.filter(a => isSameDay(a.date, today)).length;
  const weekCount = appointments.filter(a => a.date >= weekStart && a.date <= weekEnd).length;
  const confirmedCount = appointments.filter(a => a.status === 'confirmed').length;
  const pendingCount = appointments.filter(a => a.status === 'pending').length;

  const stats = [
    { icon: '/assets/ic_individuo.png', iconClass: styles.iconToday, value: todayCount, label: 'Hoje' },
    { icon: '/assets/ic_grupo.png', iconClass: styles.iconWeek, value: weekCount, label: 'Esta semana' },
    { icon: '/assets/ic_check.png', iconClass: styles.iconConfirmed, value: confirmedCount, label: 'Confirmadas' },
    { icon: '/assets/ic_pendente.png', iconClass: styles.iconPending, value: pendingCount, label: 'Pendentes' }
  ];

  return (
    <>
      <Header onMenuClick={handleMenuClick} />
      <main className="main-layout">
        <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />
        <article className="main-content">
          {/* Banner de carregamento/sincronização */}
          {(loading || syncing) && (
            <div style={{
              position: 'fixed',
              top: '80px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              <span style={{
                display: 'inline-block',
                width: '16px',
                height: '16px',
                border: '2px solid rgba(255,255,255,0.3)',
                borderTop: '2px solid white',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite'
              }}></span>
              {loading ? 'Carregando agendamentos...' : 'Sincronizando...'}
              <style jsx>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          )}

          <header className="page-header">
            <h1 className="page-title">Agendamentos</h1>
            <button 
              onClick={syncWithGoogle}
              disabled={syncing}
              style={{
                marginLeft: '1rem',
                padding: '0.5rem 1rem',
                fontSize: '0.9rem',
                background: syncing ? '#e0e0e0' : '#f0f0f0',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: syncing ? 'not-allowed' : 'pointer',
                opacity: syncing ? 0.6 : 1
              }}
            >
              {syncing ? '🔄 Sincronizando...' : '🔄 Sincronizar'}
            </button>
          </header>

          <section className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </section>

          <button 
            className="btn-primary"
            onClick={() => setShowNewAppointmentModal(true)}
          >
            <span>+</span>
            Nova Consulta
          </button>

          <Calendar 
            appointments={appointments} 
            setAppointments={setAppointments}
            onDeleteAppointment={handleDeleteAppointment}
          />
        </article>
      </main>

      <Modal
        isOpen={showNewAppointmentModal}
        onClose={() => setShowNewAppointmentModal(false)}
        title="Nova Consulta"
        footer={
          <>
            <button 
              className="btn-secondary"
              onClick={() => setShowNewAppointmentModal(false)}
            >
              Cancelar
            </button>
            <button 
              className="btn-primary"
              type="submit"
              form="appointmentForm"
            >
              Salvar
            </button>
          </>
        }
      >
        <form 
          id="appointmentForm"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            handleSaveAppointment(formData);
          }}
        >
          <label>
            Paciente:
            <input type="text" name="patient" required />
          </label>
          <label>
            Data:
            <input type="date" name="date" required />
          </label>
          <label>
            Horário:
            <input type="time" name="time" required />
          </label>
          <label>
            Status:
            <select name="status">
              <option value="pending">Pendente</option>
              <option value="confirmed">Confirmado</option>
            </select>
          </label>
          <label>
            Observações:
            <textarea name="notes" rows="3"></textarea>
          </label>
        </form>
      </Modal>
    </>
  );
}