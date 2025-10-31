'use client';

import { useState } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './perfil.module.css';

export default function PerfilPage() {
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
            <h1 className="page-title">Perfil</h1>
          </header>

          <section className={styles.profileContent}>
            <h2>Perfil</h2>
            <p style={{ marginTop: '1rem' }}>
              <strong>Nome:</strong> Ana Silva
            </p>
            <p>
              <strong>Email:</strong> ana.silva@email.com
            </p>
            <p>
              <strong>Especialidade:</strong> Dermatologia
            </p>
          </section>
        </article>
      </main>
    </>
  );
}