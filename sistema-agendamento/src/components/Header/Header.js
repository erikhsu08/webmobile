'use client';

import { useRouter } from 'next/navigation';
import styles from './Header.module.css';

export default function Header({ onMenuClick }) {
  const router = useRouter();

  const handleUserClick = () => {
    router.push('/perfil');
  };

  return (
    <header className={styles.header}>
      <section className={styles.logo}>
        <button 
          className={styles.mobileMenu}
          onClick={onMenuClick}
          aria-label="Menu mobile"
        >
          ☰
        </button>
        <span className={styles.logoIcon}></span>
        Sistema de Agendamento
      </section>
      <section className={styles.userInfo} onClick={handleUserClick}>
        <span className={styles.userAvatar}>A</span>
        Ana Silva
      </section>
    </header>
  );
}