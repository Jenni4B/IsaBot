// app/api/summary/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const checkins = body.checkins;

  if (!Array.isArray(checkins) || checkins.length === 0) {
    return NextResponse.json({ error: 'Missing or invalid check-in data' }, { status: 400 });
  }

  const messages = [
    {
      role: 'user',
      content: checkins.join('\n'),
    },
  ];

  try {
    const response = await fetch('https://api.playlab.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PLAYLAB_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        project_id: process.env.PLAYLAB_PROJECT_ID,
        messages,
        temperature: 0.7,
        stream: false,
      }),
    });

    const data = await response.json();
    const summary = data.choices?.[0]?.message?.content || 'No summary returned.';
    return NextResponse.json({ summary });
  } catch (err) {
    console.error('[Playlab API ERROR]', err);
    return NextResponse.json({ error: 'Failed to fetch summary from Playlab' }, { status: 500 });
  }
}
