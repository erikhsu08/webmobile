import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function DELETE(request) {
  try {
    // Ler do query string OU do body
    const { searchParams } = new URL(request.url);
    let eventId = searchParams.get('eventId');
    
    // Se não vier no query string, tentar ler do body
    if (!eventId) {
      try {
        const body = await request.json();
        eventId = body.eventId;
      } catch (e) {
        // Body vazio ou inválido
      }
    }
    
    console.log('🔍 Tentando deletar evento com ID:', eventId);

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

    console.log('📅 Chamando Google Calendar API para deletar evento...');

    await calendar.events.delete({
      calendarId: 'primary',
      eventId: eventId,
    });

    console.log('✅ Evento deletado com sucesso no Google Calendar!');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Erro ao deletar evento:', error.message);
    
    // Log mais detalhado do erro
    if (error.response?.data) {
      console.error('❌ Resposta da API:', error.response.data);
    }
    
    return NextResponse.json({ 
      error: error.message,
      details: error.response?.data || 'Nenhum detalhe adicional'
    }, { status: 500 });
  }
}