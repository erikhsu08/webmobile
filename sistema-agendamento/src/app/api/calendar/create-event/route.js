import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { patient, date, notes } = await request.json();

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const event = {
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

    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });

    return NextResponse.json({ success: true, eventId: response.data.id });
  } catch (error) {
    console.error('Erro ao criar evento:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}