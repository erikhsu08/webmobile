'use client';

import { useEffect } from 'react';
import styles from './Modal.module.css';

export default function Modal({ isOpen, onClose, title, children, footer }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <aside 
      className={`${styles.modal} ${isOpen ? styles.show : ''}`}
      onClick={handleBackdropClick}
    >
      <article className={styles.modalContent}>
        <header className={styles.modalHeader}>
          <h2>{title}</h2>
          <button 
            className={styles.modalClose}
            onClick={onClose}
            aria-label="Fechar modal"
          >
            ×
          </button>
        </header>
        <section className={styles.modalBody}>
          {children}
        </section>
        {footer && (
          <footer className={styles.modalFooter}>
            {footer}
          </footer>
        )}
      </article>
    </aside>
  );
}