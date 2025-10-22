'use client';

import { useState } from 'react';

export default function Prescriptions() {
  const [selectedPatientId, setSelectedPatientId] = useState(null);
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

  const getAvatarClass = (index) => {
    const classes = ['avatar-1', 'avatar-2', 'avatar-3'];
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
    <section className="prescriptions-layout">
      {/* Lista de Pacientes */}
      <aside className="patients-sidebar">
        <section className="patients-list">
          <header className="patients-header">
            <form className="search-box" onSubmit={(e) => e.preventDefault()}>
              <span className="search-icon">🔍</span>
              <input 
                type="text" 
                className="search-input" 
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
                className={`patient-item ${selectedPatientId === patient.id ? 'active' : ''}`}
                onClick={() => setSelectedPatientId(patient.id)}
              >
                <span className={`patient-avatar ${getAvatarClass(index)}`}>👤</span>
                <section className="patient-info">
                  <h4>{patient.name}</h4>
                  <p>{patient.phone}</p>
                </section>
              </article>
            ))}
          </nav>
        </section>
      </aside>

      {/* Painel do Paciente */}
      <main className="patient-main">
        <article className="patient-panel">
          {selectedPatient ? (
            <>
              <header className="patient-header">
                <section className="patient-details">
                  <h2>{selectedPatient.name}</h2>
                  <address className="contact-info">
                    <span className="contact-item">
                      <span>📞</span>
                      <span>{selectedPatient.phone}</span>
                    </span>
                    <span className="contact-item">
                      <span>✉️</span>
                      <span>{selectedPatient.email}</span>
                    </span>
                  </address>
                </section>
              </header>

              <section className="treatment-section">
                <h3 className="section-title">Informações do Paciente</h3>
                <p className="treatment-info">
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

              <section className="treatment-section">
                <h3 className="section-title">Histórico de Receituários</h3>
                <section className="documents-grid">
                  <article className="document-card">
                    <span className="doc-icon">PDF</span>
                    <h4 className="doc-name">Receituario_2024</h4>
                  </article>
                  <article className="document-card">
                    <span className="doc-icon">PDF</span>
                    <h4 className="doc-name">Atestado_exemplo</h4>
                  </article>
                </section>
              </section>

              <section className="treatment-section">
                <h3 className="section-title">Criar novo Receituário / Atestado</h3>
                <nav className="action-buttons form-nav">
                  <button 
                    className="btn-success"
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
                  <form className="prescription-form" onSubmit={handleGeneratePrescription}>
                    <fieldset className="form-section">
                      <label className="form-group">
                        <span>Medicamento</span>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="Buscar por um medicamento"
                        />
                      </label>
                      <label className="form-group">
                        <span>Observações</span>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="Adicionar observações"
                        />
                      </label>
                    </fieldset>

                    <fieldset className="form-section">
                      <label className="form-group">
                        <span>Dosagem</span>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="Exemplo: 20mg"
                        />
                      </label>
                      <label className="form-group">
                        <span>Frequência</span>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="Exemplo: 2 vezes ao dia"
                        />
                      </label>
                    </fieldset>

                    <footer className="action-buttons">
                      <button type="submit" className="btn-primary">
                        Gerar Receituário
                      </button>
                    </footer>
                  </form>
                ) : (
                  <form className="certificate-form" onSubmit={handleGenerateCertificate}>
                    <fieldset className="form-section">
                      <label className="form-group">
                        <span>Motivo do Atestado</span>
                        <textarea 
                          className="form-input" 
                          rows="3" 
                          placeholder="Descreva o motivo do atestado médico"
                        ></textarea>
                      </label>
                      <label className="form-group">
                        <span>Período de Afastamento</span>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="Exemplo: 3 dias"
                        />
                      </label>
                    </fieldset>

                    <fieldset className="form-section">
                      <label className="form-group">
                        <span>Data de Início</span>
                        <input type="date" className="form-input" />
                      </label>
                      <label className="form-group">
                        <span>Data de Fim</span>
                        <input type="date" className="form-input" />
                      </label>
                    </fieldset>

                    <footer className="action-buttons">
                      <button type="submit" className="btn-success">
                        Gerar Atestado
                      </button>
                    </footer>
                  </form>
                )}
              </section>
            </>
          ) : (
            <section className="treatment-section">
              <p className="treatment-info">Selecione um paciente para ver as informações</p>
            </section>
          )}
        </article>
      </main>
    </section>
  );
}