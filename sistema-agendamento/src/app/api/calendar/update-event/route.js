import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function PUT(request) {
  try {
    const { eventId, patient, date, notes } = await request.json();

    console.log('🔄 Tentando atualizar evento:', eventId);

    if (!eventId) {
      console.error('❌ eventId não fornecido');
      return NextResponse.json({ error: 'eventId não fornecido' }, { status: 400 });
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    // Buscar o evento existente primeiro
    console.log('📅 Buscando evento existente...');
    const existingEvent = await calendar.events.get({
      calendarId: 'primary',
      eventId: eventId,
    });

    console.log('✅ Evento encontrado, atualizando...');

    // Atualizar o evento com os novos dados
    const updatedEvent = {
      summary: `Consulta - ${patient}`,
      description: notes,
      start: {
        dateTime: new Date(date).toISOString(),
        timeZone: 'America/Sao_Paulo',
      },
      end: {
        dateTime: new Date(new Date(date).getTime() + 60 * 60 * 1000).toISOString(), // +1 hora
        timeZone: 'America/Sao_Paulo',
      },
    };

    const response = await calendar.events.update({
      calendarId: 'primary',
      eventId: eventId,
      resource: updatedEvent,
    });

    console.log('✅ Evento atualizado com sucesso no Google Calendar!');

    return NextResponse.json({ 
      success: true, 
      eventId: response.data.id,
      updated: response.data.updated
    });
  } catch (error) {
    console.error('❌ Erro ao atualizar evento:', error.message);
    
    if (error.response?.data) {
      console.error('❌ Resposta da API:', error.response.data);
    }
    
    return NextResponse.json({ 
      error: error.message,
      details: error.response?.data || 'Nenhum detalhe adicional'
    }, { status: 500 });
  }
}

// Suporte para método PATCH também (alternativa ao PUT)
export async function PATCH(request) {
  return PUT(request);
}