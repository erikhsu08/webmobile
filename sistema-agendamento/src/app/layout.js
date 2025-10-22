import './globals.css';

export const metadata = {
  title: 'Sistema de Agendamento',
  description: 'Sistema de agendamento médico',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}