'use client';

import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { href: '/', label: 'Agendamentos', icon: 'ic_agendamentos' },
    { href: '/pacientes', label: 'Pacientes', icon: 'ic_paciente' },
    { href: '/relatorios', label: 'Relatórios', icon: 'ic_relatorio' },
    { href: '/receitas', label: 'Receitas e Atestados', icon: 'ic_receitas' },
  ];

  const otherItems = [
    { href: '/configuracoes', label: 'Configurações', icon: 'ic_config' },
    { href: '/perfil', label: 'Perfil', icon: 'ic_paciente' },
    { href: '/ajuda', label: 'Ajuda', icon: 'ic_info' },
  ];

  const handleItemClick = (href) => {
    router.push(href);
    if (window.innerWidth <= 1024) {
      onClose();
    }
  };

  const isActive = (href) => pathname === href;
  
  const getIconSuffix = (href) => {
    return isActive(href) ? 'selected' : 'unselected';
  };

  return (
    <nav className={`sidebar ${isOpen ? 'show' : ''}`}>
      <section className="sidebar-section">
        <h3 className="sidebar-title">Menu</h3>
        {menuItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`sidebar-item ${isActive(item.href) ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleItemClick(item.href);
            }}
          >
            <span className="sidebar-icon">
              <Image
                src={`/assets/${item.icon}_${getIconSuffix(item.href)}.png`}
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

      <section className="sidebar-section">
        <h3 className="sidebar-title">Outros</h3>
        {otherItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`sidebar-item ${isActive(item.href) ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleItemClick(item.href);
            }}
          >
            <span className="sidebar-icon">
              <Image
                src={`/assets/${item.icon}_${getIconSuffix(item.href)}.png`}
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