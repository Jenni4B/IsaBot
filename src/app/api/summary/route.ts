import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { checkins } = await req.json();

    if (!Array.isArray(checkins) || checkins.length === 0) {
      return NextResponse.json(
        { error: 'Missing or invalid check-in data' },
        { status: 400 }
      );
    }

    // ✅ Ensure check-ins are strings and joined into one message
    const messageBody = {
      input: {
        message: checkins.filter(Boolean).join('\n'),
      },
    };

    console.log('[Playlab] Sending message:', messageBody);

    // 🔄 Create new conversation
    const conversationRes = await fetch(
      `${process.env.PLAYLAB_API_BASE}/projects/${process.env.PLAYLAB_PROJECT_ID}/conversations`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.PLAYLAB_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Playlab Summary Conversation',
          description: 'Summary conversation for recent check-ins',
        }),
      }
    );

    const convoData = await conversationRes.json();
    const conversationId = convoData?.conversation?.id;

    if (!conversationId) {
      console.error('[Playlab] Failed to create conversation:', convoData);
      return NextResponse.json(
        { error: 'Conversation creation failed', details: convoData },
        { status: 500 }
      );
    }

    // 🧠 Send message to conversation
    const messageRes = await fetch(
      `${process.env.PLAYLAB_API_BASE}/projects/${process.env.PLAYLAB_PROJECT_ID}/conversations/${conversationId}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.PLAYLAB_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageBody),
      }
    );

    const messageData = await messageRes.json();
    console.log('[Playlab] Summary Response:', messageData);

    // ✅ Extract useful content or return raw fallback
    const summary =
      messageData.completion || messageData.text || JSON.stringify(messageData);

    return NextResponse.json({ summary });
  } catch (error) {
    console.error('[Playlab Summary Error]', error);
    return NextResponse.json(
      { error: 'Failed to fetch summary from Playlab' },
      { status: 500 }
    );
  }
}
