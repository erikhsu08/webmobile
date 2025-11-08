'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import styles from './Prescriptions.module.css';


export default function Prescriptions({ initialPatientId }) {
  const router = useRouter(); 
  const selectedPatientId = initialPatientId ? parseInt(initialPatientId) : null;
  
  const [searchTerm, setSearchTerm] = useState('');
  const [formType, setFormType] = useState('receituario');

  // Dados de exemplo
  const patients = [
    { id: 1, name: 'Paulo Carvalho', phone: '(11) 99999-0001', email: 'paulo@email.com' },
    { id: 2, name: 'Maria Silva', phone: '(11) 99999-0002', email: 'maria@email.com' },
    { id: 3, name: 'Luciana Ferreira', phone: '(11) 99999-0003', email: 'luciana@email.com' }
  ];

  const appointments = [
    {
      id: 1,
      patient: 'Paulo Carvalho',
      date: new Date(2025, 9, 4, 9, 0),
      status: 'pending',
      notes: 'Consulta de rotina'
    },
    {
      id: 2,
      patient: 'Maria Silva',
      date: new Date(2025, 9, 2, 10, 0),
      status: 'confirmed',
      notes: 'Retorno'
    },
    {
      id: 3,
      patient: 'Luciana Ferreira',
      date: new Date(2025, 9, 3, 10, 0),
      status: 'confirmed',
      notes: 'Primeira consulta'
    }
  ];

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedPatient = patients.find(p => p.id === selectedPatientId); 
  
  const handlePatientClick = (patientId) => {
    // Rota dinâmica para /receitas/[patientId]
    router.push(`/receitas/${patientId}`);
  };

  const getAvatarClass = (index) => {
    const classes = ['avatar1', 'avatar2', 'avatar3'];
    return classes[index % 3];
  };

  const formatDate = (date) => {
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return `${date.getDate()}/${months[date.getMonth()]}`;
  };

  const getPatientAppointments = (patientName) => {
    return appointments.filter(a => a.patient === patientName);
  };

  const handleGeneratePrescription = (e) => {
    e.preventDefault();
    alert('Receituário gerado com sucesso!');
  };

  const handleGenerateCertificate = (e) => {
    e.preventDefault();
    alert('Atestado gerado com sucesso!');
  };

  return (
    <section className={styles.prescriptionsLayout}>
      {/* Lista de Pacientes */}
      <aside className={styles.patientsSidebar}>
        <section className={styles.patientsList}>
          <header className={styles.patientsHeader}>
            <form className={styles.searchBox} onSubmit={(e) => e.preventDefault()}>
              <span className={styles.searchIcon}>🔍</span>
              <input 
                type="text" 
                className={styles.searchInput}
                placeholder="Buscar pacientes"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </header>
          
          <nav>
            {filteredPatients.map((patient, index) => (
              <article 
                key={patient.id}
                className={`${styles.patientItem} ${selectedPatientId === patient.id ? styles.active : ''}`}
                onClick={() => handlePatientClick(patient.id)}
              >
                <span className={`${styles.patientAvatar} ${styles[getAvatarClass(index)]}`}>👤</span>
                <section className={styles.patientInfo}>
                  <h4>{patient.name}</h4>
                  <p>{patient.phone}</p>
                </section>
              </article>
            ))}
          </nav>
        </section>
      </aside>

     
      <main className={styles.patientMain}>
        <article className={styles.patientPanel}>
          {selectedPatient ? (
            <>
              <header className={styles.patientHeader}>
                <section className={styles.patientDetails}>
                  <h2>{selectedPatient.name}</h2>
                  <address className={styles.contactInfo}>
                    <span className={styles.contactItem}>
                      <span>📞</span>
                      <span>{selectedPatient.phone}</span>
                    </span>
                    <span className={styles.contactItem}>
                      <span>✉️</span>
                      <span>{selectedPatient.email}</span>
                    </span>
                  </address>
                </section>
              </header>

              <section className={styles.treatmentSection}>
                <h3 className={styles.sectionTitle}>Informações do Paciente</h3>
                <p className={styles.treatmentInfo}>
                  {(() => {
                    const patientAppointments = getPatientAppointments(selectedPatient.name);
                    const lastAppointment = patientAppointments[patientAppointments.length - 1];
                    return `Paciente com ${patientAppointments.length} consulta(s) registrada(s) no sistema. ${
                      patientAppointments.length > 0 
                        ? `Última consulta: ${formatDate(lastAppointment.date)}` 
                        : ''
                    }`;
                  })()}
                </p>
              </section>

              <section className={styles.treatmentSection}>
                <h3 className={styles.sectionTitle}>Histórico de Receituários</h3>
                <section className={styles.documentsGrid}>
                  <article className={styles.documentCard}>
                    <span className={styles.docIcon}>PDF</span>
                    <h4 className={styles.docName}>Receituario_2024</h4>
                  </article>
                  <article className={styles.documentCard}>
                    <span className={styles.docIcon}>PDF</span>
                    <h4 className={styles.docName}>Atestado_exemplo</h4>
                  </article>
                </section>
              </section>

              <section className={styles.treatmentSection}>
                <h3 className={styles.sectionTitle}>Criar novo Receituário / Atestado</h3>
                <nav className={`${styles.actionButtons} ${styles.formNav}`}>
                  <button 
                    className="btn-primary"
                    onClick={() => setFormType('receituario')}
                  >
                    Receituário
                  </button>
                  <button 
                    className="btn-secondary"
                    onClick={() => setFormType('atestado')}
                  >
                    Atestado
                  </button>
                </nav>

                {formType === 'receituario' ? (
                  <form className={styles.prescriptionForm} onSubmit={handleGeneratePrescription}>
                    <fieldset className={styles.formSection}>
                      <label className={styles.formGroup}>
                        <span>Medicamento</span>
                        <input 
                          type="text" 
                          className={styles.formInput}
                          placeholder="Buscar por um medicamento"
                        />
                      </label>
                      <label className={styles.formGroup}>
                        <span>Observações</span>
                        <input 
                          type="text" 
                          className={styles.formInput}
                          placeholder="Adicionar observações"
                        />
                      </label>
                    </fieldset>

                    <fieldset className={styles.formSection}>
                      <label className={styles.formGroup}>
                        <span>Dosagem</span>
                        <input 
                          type="text" 
                          className={styles.formInput}
                          placeholder="Exemplo: 20mg"
                        />
                      </label>
                      <label className={styles.formGroup}>
                        <span>Frequência</span>
                        <input 
                          type="text" 
                          className={styles.formInput}
                          placeholder="Exemplo: 2 vezes ao dia"
                        />
                      </label>
                    </fieldset>

                    <footer className={styles.actionButtons}>
                      <button type="submit" className="btn-primary">
                        Gerar Receituário
                      </button>
                    </footer>
                  </form>
                ) : (
                  <form className={styles.certificateForm} onSubmit={handleGenerateCertificate}>
                    <fieldset className={styles.formSection}>
                      <label className={styles.formGroup}>
                        <span>Motivo do Atestado</span>
                        <textarea 
                          className={styles.formInput}
                          rows="3" 
                          placeholder="Descreva o motivo do atestado médico"
                        ></textarea>
                      </label>
                      <label className={styles.formGroup}>
                        <span>Período de Afastamento</span>
                        <input 
                          type="text" 
                          className={styles.formInput}
                          placeholder="Exemplo: 3 dias"
                        />
                      </label>
                    </fieldset>

                    <fieldset className={styles.formSection}>
                      <label className={styles.formGroup}>
                        <span>Data de Início</span>
                        <input type="date" className={styles.formInput} />
                      </label>
                      <label className={styles.formGroup}>
                        <span>Data de Fim</span>
                        <input type="date" className={styles.formInput} />
                      </label>
                    </fieldset>

                    <footer className={styles.actionButtons}>
                      <button type="submit" className="btn-success">
                        Gerar Atestado
                      </button>
                    </footer>
                  </form>
                )}
              </section>
            </>
          ) : (
            <section className={styles.treatmentSection}>
              <p className={styles.treatmentInfo}>Selecione um paciente para ver as informações</p>
            </section>
          )}
        </article>
      </main>
    </section>
  );
}