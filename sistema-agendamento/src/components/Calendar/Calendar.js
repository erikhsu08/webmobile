'use client';

import { useState } from 'react';
import Modal from '../Modal/Modal';

export default function Calendar({ appointments, setAppointments }) {
  const [currentView, setCurrentView] = useState('week');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Funções utilitárias
  const formatDate = (date) => {
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return {
      dayName: days[date.getDay()],
      dayNumber: date.getDate(),
      monthName: months[date.getMonth()],
      year: date.getFullYear(),
      shortDay: days[date.getDay()].substring(0, 3),
      shortMonth: months[date.getMonth()].substring(0, 3)
    };
  };

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const getWeekStart = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getMonthStart = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  };

  // Navegação
  const navigateCalendar = (direction) => {
    const multiplier = direction === 'next' ? 1 : -1;
    const newDate = new Date(currentDate);
    
    switch (currentView) {
      case 'week':
        newDate.setDate(newDate.getDate() + (7 * multiplier));
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() + multiplier);
        break;
      case 'day':
        newDate.setDate(newDate.getDate() + multiplier);
        break;
      case 'year':
        newDate.setFullYear(newDate.getFullYear() + multiplier);
        break;
    }
    
    setCurrentDate(newDate);
  };

  // Handlers
  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDetailsModal(true);
  };

  const handleDeleteAppointment = () => {
    if (confirm('Deseja realmente cancelar esta consulta?')) {
      setAppointments(appointments.filter(a => a.id !== selectedAppointment.id));
      setShowDetailsModal(false);
      setSelectedAppointment(null);
    }
  };

  const handleEditAppointment = () => {
    setShowDetailsModal(false);
    setShowEditModal(true);
  };

  const handleSaveEdit = (formData) => {
    const dateStr = formData.get('date');
    const timeStr = formData.get('time');
    const [year, month, day] = dateStr.split('-').map(Number);
    const [hours, minutes] = timeStr.split(':').map(Number);

    const updatedAppointments = appointments.map(a => {
      if (a.id === selectedAppointment.id) {
        return {
          ...a,
          patient: formData.get('patient'),
          date: new Date(year, month - 1, day, hours, minutes),
          status: formData.get('status'),
          notes: formData.get('notes') || ''
        };
      }
      return a;
    });

    setAppointments(updatedAppointments);
    setShowEditModal(false);
    setSelectedAppointment(null);
  };

  // Renderização das visualizações
  const renderWeekView = () => {
    const weekStart = getWeekStart(currentDate);
    const days = [];
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(day.getDate() + i);
      days.push(day);
    }

    return (
      <section className="calendar-grid">
        <span className="calendar-time"></span>
        {days.map((day, idx) => {
          const formatted = formatDate(day);
          return (
            <header key={idx} className="calendar-day-header">
              {formatted.shortDay} {formatted.dayNumber}
            </header>
          );
        })}
        
        {Array.from({ length: 9 }, (_, hourIdx) => {
          const hour = hourIdx + 9;
          return [
            <span key={`time-${hour}`} className="calendar-time">
              {hour.toString().padStart(2, '0')}
            </span>,
            ...days.map((day, dayIdx) => {
              const dayAppointments = appointments.filter(a => {
                return isSameDay(a.date, day) && a.date.getHours() === hour;
              });
              
              return (
                <section key={`cell-${hour}-${dayIdx}`} className="calendar-cell">
                  {dayAppointments.map(apt => (
                    <article 
                      key={apt.id}
                      className={`appointment ${apt.status}`}
                      onClick={() => handleAppointmentClick(apt)}
                    >
                      {formatTime(apt.date)}<br />{apt.patient}
                    </article>
                  ))}
                </section>
              );
            })
          ];
        }).flat()}
      </section>
    );
  };

  const renderMonthView = () => {
    const firstDay = getMonthStart(currentDate);
    const daysInMonth = getDaysInMonth(currentDate);
    const startDay = firstDay.getDay();

    const cells = [];
    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    
    // Headers
    dayNames.forEach(name => {
      cells.push(
        <header key={`header-${name}`} className="calendar-day-header">
          {name}
        </header>
      );
    });

    // Dias do mês anterior
    const prevMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    for (let i = startDay - 1; i >= 0; i--) {
      cells.push(
        <section key={`prev-${i}`} className="month-day other-month">
          <span className="month-day-number">{prevMonthDays - i}</span>
        </section>
      );
    }

    // Dias do mês atual
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayAppointments = appointments.filter(a => isSameDay(a.date, currentDay));
      
      cells.push(
        <section key={`day-${day}`} className="month-day">
          <span className="month-day-number">{day}</span>
          {dayAppointments.map(apt => (
            <article 
              key={apt.id}
              className={`appointment ${apt.status}`}
              onClick={() => handleAppointmentClick(apt)}
            >
              {formatTime(apt.date)} {apt.patient}
            </article>
          ))}
        </section>
      );
    }

    // Dias do próximo mês
    const remainingCells = 42 - (startDay + daysInMonth);
    for (let i = 1; i <= remainingCells; i++) {
      cells.push(
        <section key={`next-${i}`} className="month-day other-month">
          <span className="month-day-number">{i}</span>
        </section>
      );
    }

    return <section className="month-grid">{cells}</section>;
  };

  const renderDayView = () => {
    const hours = Array.from({ length: 11 }, (_, i) => i + 8);
    
    return (
      <section className="day-view">
        {hours.map(hour => {
          const hourAppointments = appointments.filter(a => {
            return isSameDay(a.date, currentDate) && a.date.getHours() === hour;
          });
          
          return [
            <section key={`time-${hour}`} className="day-time-slot">
              {hour}:00
            </section>,
            <section key={`content-${hour}`} className="day-content-slot">
              {hourAppointments.map(apt => (
                <article 
                  key={apt.id}
                  className={`appointment ${apt.status}`}
                  onClick={() => handleAppointmentClick(apt)}
                >
                  {formatTime(apt.date)} - {apt.patient}<br />
                  <small>{apt.notes}</small>
                </article>
              ))}
            </section>
          ];
        }).flat()}
      </section>
    );
  };

  const renderYearView = () => {
    const year = currentDate.getFullYear();
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    
    return (
      <section className="year-grid">
        {months.map((month, index) => {
          const firstDay = new Date(year, index, 1);
          const daysInMonth = getDaysInMonth(firstDay);
          const startDay = firstDay.getDay();
          const dayNames = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
          
          const miniDays = [];
          
          // Headers
          dayNames.forEach((d, i) => {
            miniDays.push(
              <span key={`mini-header-${index}-${i}`} className="mini-day">{d}</span>
            );
          });
          
          // Espaços vazios
          for (let i = 0; i < startDay; i++) {
            miniDays.push(<span key={`mini-empty-${index}-${i}`} className="mini-day"></span>);
          }
          
          // Dias do mês
          for (let day = 1; day <= daysInMonth; day++) {
            const currentDay = new Date(year, index, day);
            const hasAppointment = appointments.some(a => isSameDay(a.date, currentDay));
            miniDays.push(
              <span 
                key={`mini-day-${index}-${day}`}
                className={`mini-day ${hasAppointment ? 'has-appointment' : ''}`}
              >
                {day}
              </span>
            );
          }
          
          return (
            <article key={index} className="month-card">
              <h3>{month}</h3>
              <section className="mini-calendar">{miniDays}</section>
            </article>
          );
        })}
      </section>
    );
  };

  // Título do calendário
  const getCalendarTitle = () => {
    const formatted = formatDate(currentDate);
    
    switch (currentView) {
      case 'week':
        const weekStart = getWeekStart(currentDate);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        const startFormatted = formatDate(weekStart);
        const endFormatted = formatDate(weekEnd);
        
        if (startFormatted.monthName === endFormatted.monthName) {
          return `${startFormatted.monthName} ${startFormatted.dayNumber} - ${endFormatted.dayNumber}`;
        }
        return `${startFormatted.monthName} ${startFormatted.dayNumber} - ${endFormatted.monthName} ${endFormatted.dayNumber}`;
      
      case 'month':
        return `${formatted.monthName} ${formatted.year}`;
      
      case 'day':
        return `${formatted.dayName}, ${formatted.dayNumber} de ${formatted.monthName}`;
      
      case 'year':
        return formatted.year;
      
      default:
        return '';
    }
  };

  return (
    <>
      <section className="calendar-container">
        <header className="calendar-header">
          <nav className="calendar-nav">
            <button 
              className="nav-btn" 
              onClick={() => navigateCalendar('prev')}
              aria-label="Período anterior"
            >
              ‹
            </button>
            <h2 className="calendar-title">{getCalendarTitle()}</h2>
            <button 
              className="nav-btn" 
              onClick={() => navigateCalendar('next')}
              aria-label="Próximo período"
            >
              ›
            </button>
          </nav>
          <nav className="view-switcher">
            <button 
              className={`view-btn ${currentView === 'year' ? 'active' : ''}`}
              onClick={() => setCurrentView('year')}
            >
              Ano
            </button>
            <button 
              className={`view-btn ${currentView === 'week' ? 'active' : ''}`}
              onClick={() => setCurrentView('week')}
            >
              Semana
            </button>
            <button 
              className={`view-btn ${currentView === 'month' ? 'active' : ''}`}
              onClick={() => setCurrentView('month')}
            >
              Mês
            </button>
            <button 
              className={`view-btn ${currentView === 'day' ? 'active' : ''}`}
              onClick={() => setCurrentView('day')}
            >
              Dia
            </button>
          </nav>
        </header>

        <section className="calendar-content">
          {currentView === 'week' && renderWeekView()}
          {currentView === 'month' && renderMonthView()}
          {currentView === 'day' && renderDayView()}
          {currentView === 'year' && renderYearView()}
        </section>
      </section>

      {/* Modal de detalhes */}
      {selectedAppointment && (
        <Modal
          isOpen={showDetailsModal}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedAppointment(null);
          }}
          title="Detalhes do Agendamento"
          footer={
            <>
              <button 
                className="btn-secondary"
                onClick={handleDeleteAppointment}
              >
                Cancelar Consulta
              </button>
              <button 
                className="btn-primary"
                onClick={handleEditAppointment}
              >
                Editar
              </button>
            </>
          }
        >
          <p><strong>Paciente:</strong> {selectedAppointment.patient}</p>
          <p><strong>Data:</strong> {formatDate(selectedAppointment.date).dayName}, {formatDate(selectedAppointment.date).dayNumber} de {formatDate(selectedAppointment.date).monthName} de {formatDate(selectedAppointment.date).year}</p>
          <p><strong>Horário:</strong> {formatTime(selectedAppointment.date)}</p>
          <p><strong>Status:</strong> {selectedAppointment.status === 'confirmed' ? 'Confirmado' : 'Pendente'}</p>
          <p><strong>Observações:</strong> {selectedAppointment.notes || 'Nenhuma'}</p>
        </Modal>
      )}

      {/* Modal de edição */}
      {selectedAppointment && (
        <Modal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedAppointment(null);
          }}
          title="Editar Consulta"
          footer={
            <>
              <button 
                className="btn-secondary"
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedAppointment(null);
                }}
              >
                Cancelar
              </button>
              <button 
                className="btn-primary"
                onClick={() => {
                  const form = document.getElementById('editAppointmentForm');
                  if (form.checkValidity()) {
                    handleSaveEdit(new FormData(form));
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
          <form id="editAppointmentForm">
            <label>
              Paciente:
              <input 
                type="text" 
                name="patient" 
                defaultValue={selectedAppointment.patient}
                required 
              />
            </label>
            <label>
              Data:
              <input 
                type="date" 
                name="date" 
                defaultValue={`${selectedAppointment.date.getFullYear()}-${(selectedAppointment.date.getMonth() + 1).toString().padStart(2, '0')}-${selectedAppointment.date.getDate().toString().padStart(2, '0')}`}
                required 
              />
            </label>
            <label>
              Horário:
              <input 
                type="time" 
                name="time" 
                defaultValue={formatTime(selectedAppointment.date)}
                required 
              />
            </label>
            <label>
              Status:
              <select name="status" defaultValue={selectedAppointment.status}>
                <option value="pending">Pendente</option>
                <option value="confirmed">Confirmado</option>
              </select>
            </label>
            <label>
              Observações:
              <textarea 
                name="notes" 
                rows="3"
                defaultValue={selectedAppointment.notes}
              ></textarea>
            </label>
          </form>
        </Modal>
      )}
    </>
  );
}