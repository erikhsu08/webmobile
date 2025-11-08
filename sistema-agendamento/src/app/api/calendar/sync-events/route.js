import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    // Buscar eventos dos últimos 7 dias até daqui 60 dias
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const sixtyDaysLater = new Date();
    sixtyDaysLater.setDate(sixtyDaysLater.getDate() + 60);

    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: sevenDaysAgo.toISOString(),
      timeMax: sixtyDaysLater.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
      maxResults: 250 // Aumentar limite de eventos
    });

    return NextResponse.json({ 
      events: response.data.items || [],
      syncTime: new Date().toISOString()
    });
  } catch (error) {
    console.error('Erro ao sincronizar eventos:', error);
    return NextResponse.json({ 
      error: error.message,
      events: []
    }, { status: 500 });
  }
}