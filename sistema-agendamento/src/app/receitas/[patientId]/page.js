// app/receitas/[patientId]/page.js
'use client';

import { useState } from 'react';
import Header from '../../../components/Header/Header';
import Sidebar from '../../../components/Sidebar/Sidebar';
import Prescriptions from '../../../components/Prescriptions/Prescriptions';

import { useParams } from 'next/navigation'; 

export default function PatientPrescriptionsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
 
  const params = useParams();
  const { patientId } = params; 

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <Header onMenuClick={handleMenuClick} />
      <main className="main-layout">
        <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />
        <article className="main-content">
          <header className="page-header">
            <h1 className="page-title">Receitas e Atestados</h1>
          </header>
        
          <Prescriptions initialPatientId={patientId} /> 
        </article>
      </main>
    </>
  );
}