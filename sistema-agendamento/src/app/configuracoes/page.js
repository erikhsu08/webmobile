'use client';

import { useState } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './configuracoes.module.css';

export default function ConfiguracoesPage() {
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
            <h1 className="page-title">Configurações</h1>
          </header>

          <section className={styles.settingsContent}>
            <h2>Configurações</h2>
            <p style={{ marginTop: '1rem', color: '#64748b' }}>
              Configurações do sistema em desenvolvimento.
            </p>
          </section>
        </article>
      </main>
    </>
  );
}