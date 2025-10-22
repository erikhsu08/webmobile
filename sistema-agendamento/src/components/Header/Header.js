'use client';

import { useRouter } from 'next/navigation';

export default function Header({ onMenuClick }) {
  const router = useRouter();

  const handleUserClick = () => {
    router.push('/perfil');
  };

  return (
    <header className="header">
      <section className="logo">
        <button 
          className="mobile-menu" 
          onClick={onMenuClick}
          aria-label="Menu mobile"
        >
          ☰
        </button>
        <span className="logo-icon"></span>
        Sistema de Agendamento
      </section>
      <section className="user-info" onClick={handleUserClick}>
        <span className="user-avatar">A</span>
        Ana Silva
      </section>
    </header>
  );
}