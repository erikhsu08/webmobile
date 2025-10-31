'use client';

import { useState } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './ajuda.module.css';

export default function AjudaPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <Header onMenuClick={handleMenuClick} />
      <main className="main-layout">
        <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />
        <article className="main-content">
          <header className="page-header">
            <h1 className="page-title">Ajuda</h1>
          </header>

          <section className={styles.helpContent}>
            <h2>Ajuda</h2>
            
            <h3 style={{ marginTop: '1.5rem', color: '#1e293b' }}>
              Como usar o sistema
            </h3>
            <p style={{ marginTop: '0.5rem', color: '#64748b' }}>
              1. Use o menu lateral para navegar entre as seções
            </p>
            <p style={{ color: '#64748b' }}>
              2. Clique em "Nova Consulta" para agendar
            </p>
            <p style={{ color: '#64748b' }}>
              3. Clique em um agendamento para ver detalhes
            </p>
            <p style={{ color: '#64748b' }}>
              4. Use os botões de navegação para mudar período
            </p>
            
            <h3 style={{ marginTop: '1.5rem', color: '#1e293b' }}>
              Suporte
            </h3>
            <p style={{ marginTop: '0.5rem', color: '#64748b' }}>
              Email: suporte@sistema.com
            </p>
            <p style={{ color: '#64748b' }}>
              Telefone: (11) 9999-9999
            </p>
          </section>
        </article>
      </main>
    </>
  );
}