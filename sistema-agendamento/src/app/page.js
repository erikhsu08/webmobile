'use client';

import { useState } from 'react';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import StatCard from '../components/StatCard/StatCard';
import Calendar from '../components/Calendar/Calendar';
import Modal from '../components/Modal/Modal';
import styles from '../components/StatCard/StatCard.module.css';

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patient: 'Paulo Carvalho',
      date: new Date(2025, 9, 4, 9, 0),
      status: 'pending',
      notes: 'Consulta de rotina'
    },
    {
      id: 2,
      patient: 'Maria Silva',
      date: new Date(2025, 9, 2, 10, 0),
      status: 'confirmed',
      notes: 'Retorno'
    },
    {
      id: 3,
      patient: 'Luciana Ferreira',
      date: new Date(2025, 9, 3, 10, 0),
      status: 'confirmed',
      notes: 'Primeira consulta'
    },
    {
      id: 4,
      patient: 'João Santos',
      date: new Date(2025, 9, 2, 11, 0),
      status: 'confirmed',
      notes: 'Acompanhamento'
    },
    {
      id: 5,
      patient: 'Ana Costa',
      date: new Date(2025, 9, 2, 13, 30),
      status: 'confirmed',
      notes: 'Consulta inicial'
    },
    {
      id: 6,
      patient: 'Carlos Oliveira',
      date: new Date(2025, 9, 3, 15, 0),
      status: 'pending',
      notes: 'Retorno pós-exame'
    }
  ]);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const handleSaveAppointment = (formData) => {
    const dateStr = formData.get('date');
    const timeStr = formData.get('time');
    const [year, month, day] = dateStr.split('-').map(Number);
    const [hours, minutes] = timeStr.split(':').map(Number);

    const newAppointment = {
      id: Math.max(...appointments.map(a => a.id)) + 1,
      patient: formData.get('patient'),
      date: new Date(year, month - 1, day, hours, minutes),
      status: formData.get('status'),
      notes: formData.get('notes') || ''
    };

    setAppointments([...appointments, newAppointment]);
    setShowNewAppointmentModal(false);
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
          <header className="page-header">
            <h1 className="page-title">Agendamentos</h1>
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

          <Calendar appointments={appointments} setAppointments={setAppointments} />
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
              onClick={() => {
                const form = document.getElementById('appointmentForm');
                if (form.checkValidity()) {
                  handleSaveAppointment(new FormData(form));
                } else {
                  form.reportValidity();
                }
              }}
            >
              Salvar
            </button>
          </>
        }
      >
        <form id="appointmentForm">
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