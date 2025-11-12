'use client';

import { useState } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './relatorios.module.css';

export default function RelatoriosPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const appointments = [
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
  ];

  const patients = [
    { id: 1, name: 'Paulo Carvalho', phone: '(11) 99999-0001', email: 'paulo@email.com' },
    { id: 2, name: 'Maria Silva', phone: '(11) 99999-0002', email: 'maria@email.com' },
    { id: 3, name: 'Luciana Ferreira', phone: '(11) 99999-0003', email: 'luciana@email.com' }
  ];

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const totalAppointments = appointments.length;
  const confirmedAppointments = appointments.filter(a => a.status === 'confirmed').length;
  const pendingAppointments = appointments.filter(a => a.status === 'pending').length;
  const totalPatients = patients.length;

  return (
    <>
      <Header onMenuClick={handleMenuClick} />
      <main className="main-layout">
        <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />
        <article className="main-content">
          <header className="page-header">
            <h1 className="page-title">Relatórios</h1>
          </header>

          <section className={styles.reportsContent}>
            <h2>Relatórios</h2>
            <p style={{ marginTop: '1rem', color: '#64748b' }}>
              Total de consultas: {totalAppointments}
            </p>
            <p style={{ color: '#64748b' }}>
              Consultas confirmadas: {confirmedAppointments}
            </p>
            <p style={{ color: '#64748b' }}>
              Consultas pendentes: {pendingAppointments}
            </p>
            <p style={{ color: '#64748b' }}>
              Total de pacientes: {totalPatients}
            </p>
          </section>
        </article>
      </main>
    </>
  );
}
