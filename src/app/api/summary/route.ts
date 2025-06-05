// app/api/summary/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { checkins } = await req.json();

  if (!Array.isArray(checkins) || checkins.length === 0) {
    return NextResponse.json({ error: 'Missing or invalid check-in data' }, { status: 400 });
  }

  try {
    // 1. Create a new conversation
    const convoRes = await fetch(`${process.env.PLAYLAB_API_BASE}/projects/${process.env.PLAYLAB_PROJECT_ID}/conversations`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PLAYLAB_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const convoData = await convoRes.json();
    console.log('Playlab Summary Conversation data log:', convoData);
    const conversationId = convoData?.conversation?.id;

    if (!conversationId) {
      return NextResponse.json({ error: 'Failed to create conversation', convoData }, { status: 500 });
    }

    // 2. Send check-ins as a message
    const messageBody = {
      input: {
        message: checkins.join('\n'),
      },
    };

    const messageRes = await fetch(`${process.env.PLAYLAB_API_BASE}/projects/${process.env.PLAYLAB_PROJECT_ID}/conversations/${conversationId}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PLAYLAB_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageBody),
    });

    const responseText = await messageRes.text();

    return NextResponse.json({ summary: responseText });
  } catch (error) {
    console.error('[Playlab Summary Error]', error);
    return NextResponse.json({ error: 'Failed to fetch summary from Playlab' }, { status: 500 });
  }
}
