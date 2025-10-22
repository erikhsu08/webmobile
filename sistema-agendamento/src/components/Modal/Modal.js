'use client';

import { useEffect } from 'react';

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
      className={`modal ${isOpen ? 'show' : ''}`}
      onClick={handleBackdropClick}
    >
      <article className="modal-content">
        <header className="modal-header">
          <h2>{title}</h2>
          <button 
            className="modal-close" 
            onClick={onClose}
            aria-label="Fechar modal"
          >
            ×
          </button>
        </header>
        <section className="modal-body">
          {children}
        </section>
        {footer && (
          <footer className="modal-footer">
            {footer}
          </footer>
        )}
      </article>
    </aside>
  );
}