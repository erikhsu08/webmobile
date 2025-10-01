// Estado da aplicação
const state = {
    currentView: 'week',
    currentDate: new Date(),
    appointments: [
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
        },
        {
            id: 4,
            patient: 'João Santos',
            date: new Date(2025, 9, 2, 11, 0),
            status: 'confirmed',
            notes: 'Acompanhamento'
        },
        {
            id: 5,
            patient: 'Ana Costa',
            date: new Date(2025, 9, 2, 13, 30),
            status: 'confirmed',
            notes: 'Consulta inicial'
        },
        {
            id: 6,
            patient: 'Carlos Oliveira',
            date: new Date(2025, 9, 3, 15, 0),
            status: 'pending',
            notes: 'Retorno pós-exame'
        }
    ],
    patients: [
        { id: 1, name: 'Paulo Carvalho', phone: '(11) 99999-0001', email: 'paulo@email.com' },
        { id: 2, name: 'Maria Silva', phone: '(11) 99999-0002', email: 'maria@email.com' },
        { id: 3, name: 'Luciana Ferreira', phone: '(11) 99999-0003', email: 'luciana@email.com' }
    ],
    nextId: 7
};

// Estado para a tela de receitas
let selectedPatientId = null;

// Mudar o icone no side bar conforme as seções forem selecionadas
document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', () => {
        // Remove active de todos
        document.querySelectorAll('.sidebar-item').forEach(i => {
            i.classList.remove('active');
            let icon = i.dataset.icon;
            i.querySelector("img").src = `assets/${icon}_unselected.png`;
        });

        // Marca o atual
        item.classList.add('active');
        let icon = item.dataset.icon;
        item.querySelector("img").src = `assets/${icon}_selected.png`;
    });
});

// Utilidades
const formatDate = (date) => {
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return {
        dayName: days[date.getDay()],
        dayNumber: date.getDate(),
        monthName: months[date.getMonth()],
        year: date.getFullYear(),
        shortDay: days[date.getDay()].substring(0, 3),
        shortMonth: months[date.getMonth()].substring(0, 3)
    };
};

const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};

const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
};

const getWeekStart = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
};

const getMonthStart = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
};

const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

// Gerenciamento de telas
const initScreens = () => {
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const screen = item.dataset.screen;
            showScreen(screen);
            
            document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            if (window.innerWidth <= 1024) {
                document.getElementById('sidebar').classList.remove('show');
            }
        });
    });

    document.getElementById('userInfo').addEventListener('click', () => {
        showScreen('profile');
        document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
        document.querySelector('[data-screen="profile"]').classList.add('active');
    
        if (window.innerWidth <= 1024) {
            document.getElementById('sidebar').classList.remove('show');
        }
    });

};

const showScreen = (screenId) => {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    
    if (screenId === 'patients') renderPatients();
    if (screenId === 'reports') renderReports();
    if (screenId === 'prescriptions') renderPrescriptions();
    if (screenId === 'settings') renderSettings();
    if (screenId === 'profile') renderProfile();
    if (screenId === 'help') renderHelp();
};

// Estatísticas
const updateStats = () => {
    const today = new Date();
    const weekStart = getWeekStart(today);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    
    const todayCount = state.appointments.filter(a => isSameDay(a.date, today)).length;
    const weekCount = state.appointments.filter(a => a.date >= weekStart && a.date <= weekEnd).length;
    const confirmedCount = state.appointments.filter(a => a.status === 'confirmed').length;
    const pendingCount = state.appointments.filter(a => a.status === 'pending').length;
    
    const stats = [
        { icon: '/assets/ic_individuo.png', class: 'icon-today', value: todayCount, label: 'Hoje' },
        { icon: '/assets/ic_grupo.png', class: 'icon-week', value: weekCount, label: 'Esta semana' },
        { icon: '/assets/ic_check.png', class: 'icon-confirmed', value: confirmedCount, label: 'Confirmadas' },
        { icon: '/assets/ic_pendente.png', class: 'icon-pending', value: pendingCount, label: 'Pendentes' }
    ];
    
    const html = stats.map(s => `
    <article class="stat-card">
        <span class="stat-icon ${s.class}">
            <img src="${s.icon}" alt="${s.label}" class="icon-img"/>
        </span>
        <section class="stat-content">
            <h3>${s.value}</h3>
            <p>${s.label}</p>
        </section>
    </article>
`).join('');
    
    document.getElementById('statsGrid').innerHTML = html;
};

// Calendário - Visualização Semanal
const renderWeekView = () => {
    const weekStart = getWeekStart(state.currentDate);
    const days = [];
    
    for (let i = 0; i < 7; i++) {
        const day = new Date(weekStart);
        day.setDate(day.getDate() + i);
        days.push(day);
    }
    
    const startMonth = formatDate(days[0]).monthName;
    const endMonth = formatDate(days[6]).monthName;
    const title = startMonth === endMonth 
        ? `${startMonth} ${days[0].getDate()} - ${days[6].getDate()}`
        : `${startMonth} ${days[0].getDate()} - ${endMonth} ${days[6].getDate()}`;
    
    document.getElementById('calendarTitle').textContent = title;
    
    let html = '<section class="calendar-grid">';
    html += '<span class="calendar-time"></span>';
    
    days.forEach(day => {
        const formatted = formatDate(day);
        html += `<header class="calendar-day-header">${formatted.shortDay} ${formatted.dayNumber}</header>`;
    });
    
    for (let hour = 9; hour <= 17; hour++) {
        html += `<span class="calendar-time">${hour.toString().padStart(2, '0')}</span>`;
        
        days.forEach(day => {
            const dayAppointments = state.appointments.filter(a => {
                return isSameDay(a.date, day) && a.date.getHours() === hour;
            });
            
            html += '<section class="calendar-cell">';
            dayAppointments.forEach(apt => {
                html += `
                    <article class="appointment ${apt.status}" data-id="${apt.id}">
                        ${formatTime(apt.date)}<br>${apt.patient}
                    </article>
                `;
            });
            html += '</section>';
        });
    }
    
    html += '</section>';
    document.getElementById('calendarContent').innerHTML = html;
    
    attachAppointmentListeners();
};

// Calendário - Visualização Mensal
const renderMonthView = () => {
    const firstDay = getMonthStart(state.currentDate);
    const daysInMonth = getDaysInMonth(state.currentDate);
    const startDay = firstDay.getDay();
    const formatted = formatDate(state.currentDate);
    
    document.getElementById('calendarTitle').textContent = `${formatted.monthName} ${formatted.year}`;
    
    let html = '<section class="month-grid">';
    
    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    dayNames.forEach(name => {
        html += `<header class="calendar-day-header">${name}</header>`;
    });
    
    const prevMonthDays = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth(), 0).getDate();
    for (let i = startDay - 1; i >= 0; i--) {
        html += `<section class="month-day other-month">
            <span class="month-day-number">${prevMonthDays - i}</span>
        </section>`;
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
        const currentDay = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth(), day);
        const dayAppointments = state.appointments.filter(a => isSameDay(a.date, currentDay));
        
        html += `<section class="month-day">
            <span class="month-day-number">${day}</span>`;
        
        dayAppointments.forEach(apt => {
            html += `
                <article class="appointment ${apt.status}" data-id="${apt.id}">
                    ${formatTime(apt.date)} ${apt.patient}
                </article>
            `;
        });
        
        html += '</section>';
    }
    
    const remainingCells = 42 - (startDay + daysInMonth);
    for (let i = 1; i <= remainingCells; i++) {
        html += `<section class="month-day other-month">
            <span class="month-day-number">${i}</span>
        </section>`;
    }
    
    html += '</section>';
    document.getElementById('calendarContent').innerHTML = html;
    
    attachAppointmentListeners();
};

// Calendário - Visualização Diária
const renderDayView = () => {
    const formatted = formatDate(state.currentDate);
    document.getElementById('calendarTitle').textContent = 
        `${formatted.dayName}, ${formatted.dayNumber} de ${formatted.monthName}`;
    
    let html = '<section class="day-view">';
    
    for (let hour = 8; hour <= 18; hour++) {
        html += `<section class="day-time-slot">${hour}:00</section>`;
        
        const hourAppointments = state.appointments.filter(a => {
            return isSameDay(a.date, state.currentDate) && a.date.getHours() === hour;
        });
        
        html += '<section class="day-content-slot">';
        hourAppointments.forEach(apt => {
            html += `
                <article class="appointment ${apt.status}" data-id="${apt.id}">
                    ${formatTime(apt.date)} - ${apt.patient}<br>
                    <small>${apt.notes}</small>
                </article>
            `;
        });
        html += '</section>';
    }
    
    html += '</section>';
    document.getElementById('calendarContent').innerHTML = html;
    
    attachAppointmentListeners();
};


// Calendário - Visualização Anual
const renderYearView = () => {
    const year = state.currentDate.getFullYear();
    document.getElementById('calendarTitle').textContent = year;
    
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    
    let html = '<section class="year-grid">';
    
    months.forEach((month, index) => {
        const firstDay = new Date(year, index, 1);
        const daysInMonth = getDaysInMonth(firstDay);
        const startDay = firstDay.getDay();
        
        html += `<article class="month-card">
            <h3>${month}</h3>
            <section class="mini-calendar">`;
        
        const dayNames = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
        dayNames.forEach(d => html += `<span class="mini-day">${d}</span>`);
        
        for (let i = 0; i < startDay; i++) {
            html += '<span class="mini-day"></span>';
        }
        
        for (let day = 1; day <= daysInMonth; day++) {
            const currentDay = new Date(year, index, day);
            const hasAppointment = state.appointments.some(a => isSameDay(a.date, currentDay));
            html += `<span class="mini-day ${hasAppointment ? 'has-appointment' : ''}">${day}</span>`;
        }
        
        html += '</section></article>';
    });
    
    html += '</section>';
    document.getElementById('calendarContent').innerHTML = html;
};

// Renderizar calendário baseado na visualização atual
const renderCalendar = () => {
    switch (state.currentView) {
        case 'week':
            renderWeekView();
            break;
        case 'month':
            renderMonthView();
            break;
        case 'day':
            renderDayView();
            break;
        case 'year':
            renderYearView();
            break;
    }
};

// Navegação do calendário
const navigateCalendar = (direction) => {
    const multiplier = direction === 'next' ? 1 : -1;
    
    switch (state.currentView) {
        case 'week':
            state.currentDate.setDate(state.currentDate.getDate() + (7 * multiplier));
            break;
        case 'month':
            state.currentDate.setMonth(state.currentDate.getMonth() + multiplier);
            break;
        case 'day':
            state.currentDate.setDate(state.currentDate.getDate() + multiplier);
            break;
        case 'year':
            state.currentDate.setFullYear(state.currentDate.getFullYear() + multiplier);
            break;
    }
    
    renderCalendar();
};

// Modal de detalhes do agendamento
const showAppointmentDetails = (appointmentId) => {
    const appointment = state.appointments.find(a => a.id === appointmentId);
    if (!appointment) return;
    
    const formatted = formatDate(appointment.date);
    const html = `
        <p><strong>Paciente:</strong> ${appointment.patient}</p>
        <p><strong>Data:</strong> ${formatted.dayName}, ${formatted.dayNumber} de ${formatted.monthName} de ${formatted.year}</p>
        <p><strong>Horário:</strong> ${formatTime(appointment.date)}</p>
        <p><strong>Status:</strong> ${appointment.status === 'confirmed' ? 'Confirmado' : 'Pendente'}</p>
        <p><strong>Observações:</strong> ${appointment.notes || 'Nenhuma'}</p>
    `;
    
    document.getElementById('appointmentDetails').innerHTML = html;
    document.getElementById('appointmentModal').classList.add('show');
    
    document.getElementById('cancelAppointmentBtn').onclick = () => {
        if (confirm('Deseja realmente cancelar esta consulta?')) {
            state.appointments = state.appointments.filter(a => a.id !== appointmentId);
            closeModal('appointmentModal');
            renderCalendar();
            updateStats();
        }
    };

    document.getElementById('editAppointmentBtn').onclick = () => {
        closeModal('appointmentModal');
        showEditAppointmentModal(appointmentId);
    };
};


// Modal de edição de consulta
const showEditAppointmentModal = (appointmentId) => {
    const appointment = state.appointments.find(a => a.id === appointmentId);
    if (!appointment) return;
    
    const form = document.getElementById('appointmentForm');
    
    // Preencher o formulário com os dados atuais
    const year = appointment.date.getFullYear();
    const month = (appointment.date.getMonth() + 1).toString().padStart(2, '0');
    const day = appointment.date.getDate().toString().padStart(2, '0');
    const hours = appointment.date.getHours().toString().padStart(2, '0');
    const minutes = appointment.date.getMinutes().toString().padStart(2, '0');
    
    form.elements['patient'].value = appointment.patient;
    form.elements['date'].value = `${year}-${month}-${day}`;
    form.elements['time'].value = `${hours}:${minutes}`;
    form.elements['status'].value = appointment.status;
    form.elements['notes'].value = appointment.notes;
    
    // Mudar o título do modal
    document.querySelector('#newAppointmentModal .modal-header h2').textContent = 'Editar Consulta';
    
    // Mostrar o modal
    document.getElementById('newAppointmentModal').classList.add('show');
    
    // Substituir o comportamento do botão salvar
    const saveBtn = document.getElementById('saveAppointment');
    const newSaveHandler = () => {
        const formData = new FormData(form);
        
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        const dateStr = formData.get('date');
        const timeStr = formData.get('time');
        const [editYear, editMonth, editDay] = dateStr.split('-').map(Number);
        const [editHours, editMinutes] = timeStr.split(':').map(Number);
        
        // Atualizar o agendamento existente
        appointment.patient = formData.get('patient');
        appointment.date = new Date(editYear, editMonth - 1, editDay, editHours, editMinutes);
        appointment.status = formData.get('status');
        appointment.notes = formData.get('notes') || '';
        
        closeModal('newAppointmentModal');
        
        // Restaurar o título do modal e o comportamento original
        document.querySelector('#newAppointmentModal .modal-header h2').textContent = 'Nova Consulta';
        saveBtn.removeEventListener('click', newSaveHandler);
        saveBtn.addEventListener('click', saveNewAppointment);
        
        renderCalendar();
        updateStats();
    };
    
    saveBtn.removeEventListener('click', saveNewAppointment);
    saveBtn.addEventListener('click', newSaveHandler);
    
    // Restaurar ao fechar
    const restoreModal = () => {
        document.querySelector('#newAppointmentModal .modal-header h2').textContent = 'Nova Consulta';
        saveBtn.removeEventListener('click', newSaveHandler);
        saveBtn.addEventListener('click', saveNewAppointment);
    };
    
    document.getElementById('closeNewAppointmentModal').addEventListener('click', restoreModal, { once: true });
    document.getElementById('cancelNewAppointment').addEventListener('click', restoreModal, { once: true });
};

const attachAppointmentListeners = () => {
    document.querySelectorAll('.appointment').forEach(apt => {
        apt.addEventListener('click', () => {
            const id = parseInt(apt.dataset.id);
            showAppointmentDetails(id);
        });
    });
};

// Modal de nova consulta
const showNewAppointmentModal = () => {
    document.getElementById('appointmentForm').reset();
    document.getElementById('newAppointmentModal').classList.add('show');
};

const saveNewAppointment = () => {
    const form = document.getElementById('appointmentForm');
    const formData = new FormData(form);
    
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const dateStr = formData.get('date');
    const timeStr = formData.get('time');
    const [year, month, day] = dateStr.split('-').map(Number);
    const [hours, minutes] = timeStr.split(':').map(Number);
    
    const newAppointment = {
        id: state.nextId++,
        patient: formData.get('patient'),
        date: new Date(year, month - 1, day, hours, minutes),
        status: formData.get('status'),
        notes: formData.get('notes') || ''
    };
    
    state.appointments.push(newAppointment);
    closeModal('newAppointmentModal');
    renderCalendar();
    updateStats();
};

const closeModal = (modalId) => {
    document.getElementById(modalId).classList.remove('show');
};

// Renderizar outras telas
const renderPatients = () => {
    const html = `
        <h2>Lista de Pacientes</h2>
        <table style="width: 100%; margin-top: 1rem; border-collapse: collapse;">
            <thead>
                <tr style="border-bottom: 2px solid #e2e8f0;">
                    <th style="padding: 1rem; text-align: left;">Nome</th>
                    <th style="padding: 1rem; text-align: left;">Telefone</th>
                    <th style="padding: 1rem; text-align: left;">Email</th>
                </tr>
            </thead>
            <tbody>
                ${state.patients.map(p => `
                    <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 1rem;">${p.name}</td>
                        <td style="padding: 1rem;">${p.phone}</td>
                        <td style="padding: 1rem;">${p.email}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    document.getElementById('patientsList').innerHTML = html;
};

const renderReports = () => {
    const html = `
        <h2>Relatórios</h2>
        <p style="margin-top: 1rem; color: #64748b;">Total de consultas: ${state.appointments.length}</p>
        <p style="color: #64748b;">Consultas confirmadas: ${state.appointments.filter(a => a.status === 'confirmed').length}</p>
        <p style="color: #64748b;">Consultas pendentes: ${state.appointments.filter(a => a.status === 'pending').length}</p>
        <p style="color: #64748b;">Total de pacientes: ${state.patients.length}</p>
    `;
    document.getElementById('reportsContent').innerHTML = html;
};

const renderPrescriptions = () => {
    renderPatientsSidebar();
    if (selectedPatientId) {
        renderPatientPanel(selectedPatientId);
    }
};

const renderPatientsSidebar = () => {
    const searchInput = document.getElementById('searchPatients');
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    
    const filteredPatients = state.patients.filter(p => 
        p.name.toLowerCase().includes(searchTerm)
    );
    
    const html = filteredPatients.map((patient, index) => `
        <article class="patient-item ${selectedPatientId === patient.id ? 'active' : ''}" onclick="selectPatient(${patient.id})">
            <span class="patient-avatar avatar-${(index % 3) + 1}">👤</span>
            <section class="patient-info">
                <h4>${patient.name}</h4>
                <p>${patient.phone}</p>
            </section>
        </article>
    `).join('');
    
    document.getElementById('patientsSidebarList').innerHTML = html;
};

const selectPatient = (patientId) => {
    selectedPatientId = patientId;
    renderPatientsSidebar();
    renderPatientPanel(patientId);
};

const renderPatientPanel = (patientId) => {
    const patient = state.patients.find(p => p.id === patientId);
    if (!patient) return;
    
    const patientAppointments = state.appointments.filter(a => a.patient === patient.name);
    
    const html = `
        <header class="patient-header">
            <section class="patient-details">
                <h2>${patient.name}</h2>
                <address class="contact-info">
                    <span class="contact-item">
                        <span>📞</span>
                        <span>${patient.phone}</span>
                    </span>
                    <span class="contact-item">
                        <span>✉️</span>
                        <span>${patient.email}</span>
                    </span>
                </address>
            </section>
        </header>

        <section class="treatment-section">
            <h3 class="section-title">Informações do Paciente</h3>
            <p class="treatment-info">
                Paciente com ${patientAppointments.length} consulta(s) registrada(s) no sistema.
                ${patientAppointments.length > 0 ? `Última consulta: ${formatDate(patientAppointments[patientAppointments.length - 1].date).dayNumber}/${formatDate(patientAppointments[patientAppointments.length - 1].date).monthName}` : ''}
            </p>
        </section>

        <section class="treatment-section">
            <h3 class="section-title">Histórico de Receituários</h3>
            <section class="documents-grid">
                <article class="document-card">
                    <span class="doc-icon">PDF</span>
                    <h4 class="doc-name">Receituario_2024</h4>
                </article>
                <article class="document-card">
                    <span class="doc-icon">PDF</span>
                    <h4 class="doc-name">Atestado_exemplo</h4>
                </article>
            </section>
        </section>

        <section class="treatment-section">
            <h3 class="section-title">Criar novo Receituário / Atestado</h3>
            <nav class="action-buttons form-nav">
                <button class="btn-success" onclick="showForm('receituario')">Receituário</button>
                <button class="btn-secondary" onclick="showForm('atestado')">Atestado</button>
            </nav>

            <form id="prescription-form" class="prescription-form">
                <fieldset class="form-section">
                    <label class="form-group">
                        <span>Medicamento</span>
                        <input type="text" class="form-input" placeholder="Buscar por um medicamento">
                    </label>
                    <label class="form-group">
                        <span>Observações</span>
                        <input type="text" class="form-input" placeholder="Adicionar observações">
                    </label>
                </fieldset>

                <fieldset class="form-section">
                    <label class="form-group">
                        <span>Dosagem</span>
                        <input type="text" class="form-input" placeholder="Exemplo: 20mg">
                    </label>
                    <label class="form-group">
                        <span>Frequência</span>
                        <input type="text" class="form-input" placeholder="Exemplo: 2 vezes ao dia">
                    </label>
                </fieldset>

                <footer class="action-buttons">
                    <button type="submit" class="btn-primary" onclick="generatePrescription(event)">Gerar Receituário</button>
                </footer>
            </form>

            <form id="certificate-form" class="certificate-form" style="display: none;">
                <fieldset class="form-section">
                    <label class="form-group">
                        <span>Motivo do Atestado</span>
                        <textarea class="form-input" rows="3" placeholder="Descreva o motivo do atestado médico"></textarea>
                    </label>
                    <label class="form-group">
                        <span>Período de Afastamento</span>
                        <input type="text" class="form-input" placeholder="Exemplo: 3 dias">
                    </label>
                </fieldset>

                <fieldset class="form-section">
                    <label class="form-group">
                        <span>Data de Início</span>
                        <input type="date" class="form-input">
                    </label>
                    <label class="form-group">
                        <span>Data de Fim</span>
                        <input type="date" class="form-input">
                    </label>
                </fieldset>

                <footer class="action-buttons">
                    <button type="submit" class="btn-success" onclick="generateCertificate(event)">Gerar Atestado</button>

                    </button>
                </footer>
            </form>
        </section>
    `;
    
    document.getElementById('patientPanel').innerHTML = html;
};

const showForm = (formType) => {
    const prescriptionForm = document.getElementById('prescription-form');
    const certificateForm = document.getElementById('certificate-form');
    
    if (formType === 'receituario') {
        prescriptionForm.style.display = 'block';
        certificateForm.style.display = 'none';
    } else {
        prescriptionForm.style.display = 'none';
        certificateForm.style.display = 'block';
    }
};

const generatePrescription = (e) => {
    e.preventDefault();
    alert('Receituário gerado com sucesso!');
};

const generateCertificate = (e) => {
    e.preventDefault();
    alert('Atestado gerado com sucesso!');
};

const renderSettings = () => {
    const html = `
        <h2>Configurações</h2>
        <p style="margin-top: 1rem; color: #64748b;">Configurações do sistema em desenvolvimento.</p>
    `;
    document.getElementById('settingsContent').innerHTML = html;
};

const renderProfile = () => {
    const html = `
        <h2>Perfil</h2>
        <p style="margin-top: 1rem;"><strong>Nome:</strong> Ana Silva</p>
        <p><strong>Email:</strong> ana.silva@email.com</p>
        <p><strong>Especialidade:</strong> Dermatologia</p>
    `;
    document.getElementById('profileContent').innerHTML = html;
};

const renderHelp = () => {
    const html = `
        <h2>Ajuda</h2>
        <h3 style="margin-top: 1.5rem; color: #1e293b;">Como usar o sistema</h3>
        <p style="margin-top: 0.5rem; color: #64748b;">1. Use o menu lateral para navegar entre as seções</p>
        <p style="color: #64748b;">2. Clique em "Nova Consulta" para agendar</p>
        <p style="color: #64748b;">3. Clique em um agendamento para ver detalhes</p>
        <p style="color: #64748b;">4. Use os botões de navegação para mudar período</p>
        <h3 style="margin-top: 1.5rem; color: #1e293b;">Suporte</h3>
        <p style="margin-top: 0.5rem; color: #64748b;">Email: suporte@sistema.com</p>
        <p style="color: #64748b;">Telefone: (11) 9999-9999</p>
    `;
    document.getElementById('helpContent').innerHTML = html;
};

// Inicialização
const init = () => {
    // Navegação
    initScreens();
    
    // Busca de pacientes na tela de receitas
    const searchInput = document.getElementById('searchPatients');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            if (document.getElementById('prescriptions').classList.contains('active')) {
                renderPatientsSidebar();
            }
        });
    }
    
    // Menu mobile
    document.getElementById('mobileMenuBtn').addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('show');
    });
    
    // Visualizações do calendário
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.currentView = btn.dataset.view;
            renderCalendar();
        });
    });
    
    // Navegação do calendário
    document.getElementById('prevPeriod').addEventListener('click', () => navigateCalendar('prev'));
    document.getElementById('nextPeriod').addEventListener('click', () => navigateCalendar('next'));
    
    // Modais
    document.getElementById('newAppointmentBtn').addEventListener('click', showNewAppointmentModal);
    document.getElementById('closeAppointmentModal').addEventListener('click', () => closeModal('appointmentModal'));
    document.getElementById('closeNewAppointmentModal').addEventListener('click', () => closeModal('newAppointmentModal'));
    document.getElementById('cancelNewAppointment').addEventListener('click', () => closeModal('newAppointmentModal'));
    document.getElementById('saveAppointment').addEventListener('click', saveNewAppointment);
    
    // Fechar modal ao clicar fora
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    });
    
    // Renderizar inicial
    updateStats();
    renderCalendar();
};

// Iniciar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}