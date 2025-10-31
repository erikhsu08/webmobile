'use client';

import { useState } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Modal from '../../components/Modal/Modal';
import styles from './pacientes.module.css';

export default function PacientesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNewPatientModal, setShowNewPatientModal] = useState(false);
  const [patients, setPatients] = useState([
    { id: 1, name: 'Paulo Carvalho', phone: '(11) 99999-0001', email: 'paulo@email.com' },
    { id: 2, name: 'Maria Silva', phone: '(11) 99999-0002', email: 'maria@email.com' },
    { id: 3, name: 'Luciana Ferreira', phone: '(11) 99999-0003', email: 'luciana@email.com' }
  ]);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const handleSavePatient = (formData) => {
    const newPatient = {
      id: Math.max(...patients.map(p => p.id)) + 1,
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email')
    };

    setPatients([...patients, newPatient]);
    setShowNewPatientModal(false);
  };

  return (
    <>
      <Header onMenuClick={handleMenuClick} />
      <main className="main-layout">
        <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />
        <article className="main-content">
          <header className="page-header">
            <h1 className="page-title">Pacientes</h1>
            <button 
              className="btn-primary"
              onClick={() => setShowNewPatientModal(true)}
            >
              + Novo Paciente
            </button>
          </header>

          <section className={styles.patientsList}>
            <h2>Lista de Pacientes</h2>
            <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Nome</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Telefone</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Email</th>
                </tr>
              </thead>
              <tbody>
                {patients.map(patient => (
                  <tr key={patient.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '1rem' }}>{patient.name}</td>
                    <td style={{ padding: '1rem' }}>{patient.phone}</td>
                    <td style={{ padding: '1rem' }}>{patient.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </article>
      </main>

      <Modal
        isOpen={showNewPatientModal}
        onClose={() => setShowNewPatientModal(false)}
        title="Novo Paciente"
        footer={
          <>
            <button 
              className="btn-secondary"
              onClick={() => setShowNewPatientModal(false)}
            >
              Cancelar
            </button>
            <button 
              className="btn-primary"
              onClick={() => {
                const form = document.getElementById('newPatientForm');
                if (form.checkValidity()) {
                  handleSavePatient(new FormData(form));
                } else {
                  form.reportValidity();
                }
              }}
            >
              Salvar
            </button>
          </>
        }
      >
        <form id="newPatientForm">
          <label>
            Nome:
            <input type="text" name="name" required />
          </label>
          <label>
            Telefone:
            <input type="tel" name="phone" required />
          </label>
          <label>
            Email:
            <input type="email" name="email" required />
          </label>
        </form>
      </Modal>
    </>
  );
}