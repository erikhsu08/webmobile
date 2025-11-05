'use client';

import { usePathname, useRouter } from 'next/navigation';
import styles from './Sidebar.module.css';
import Image from 'next/image';

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { href: '/', label: 'Agendamentos', icon: 'ic_agendamento' },
    { href: '/pacientes', label: 'Pacientes', icon: 'ic_perfil' },
    { href: '/relatorios', label: 'Relatórios', icon: 'ic_relatorios' },
    { href: '/receitas', label: 'Receitas e Atestados', icon: 'ic_receitas' },
  ];

  const otherItems = [
    { href: '/configuracoes', label: 'Configurações', icon: 'ic_config' },
    { href: '/perfil', label: 'Perfil', icon: 'ic_perfil' },
    { href: '/ajuda', label: 'Ajuda', icon: 'ic_ajuda' },
  ];

  const handleItemClick = (href) => {
    router.push(href);
    if (window.innerWidth <= 1024) onClose();
  };

  const isActive = (href) => pathname === href;

  const getIconSuffix = (href) => (isActive(href) ? 'selected' : 'unselected');

  return (
    <nav className={`${styles.sidebar} ${isOpen ? styles.show : ''}`}>
      <section className={styles.sidebarSection}>
        <h3 className={styles.sidebarTitle}>Menu</h3>
        {menuItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`${styles.sidebarItem} ${
              isActive(item.href) ? styles.active : ''
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleItemClick(item.href);
            }}
          >
            <span className={styles.sidebarIcon}>
              <Image
                src={`/assets/svg/${item.icon}_${getIconSuffix(item.href)}.svg`}
                alt={item.label}
                width={24}
                height={24}
                style={{ objectFit: 'contain' }}
              />
            </span>
            {item.label}
          </a>
        ))}
      </section>

      <section className={styles.sidebarSection}>
        <h3 className={styles.sidebarTitle}>Outros</h3>
        {otherItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`${styles.sidebarItem} ${
              isActive(item.href) ? styles.active : ''
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleItemClick(item.href);
            }}
          >
            <span className={styles.sidebarIcon}>
              <Image
                src={`/assets/svg/${item.icon}_${getIconSuffix(item.href)}.svg`}
                alt={item.label}
                width={24}
                height={24}
                style={{ objectFit: 'contain' }}
              />
            </span>
            {item.label}
          </a>
        ))}
      </section>
    </nav>
  );
}
