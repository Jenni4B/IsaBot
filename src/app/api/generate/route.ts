import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // Ensure the request is a POST with JSON body
  const body = await req.json();
  const input = body?.input?.message;

  if (!input || typeof input !== 'string') {
    return NextResponse.json({ error: 'Invalid input format. Expected input.message to be a string.' }, { status: 400 });
  }

  // Prepare the message body for Playlab API
  const messageBody = {
    input: {
      message: input,
    },
  };

  console.log('[Request Payload]', JSON.stringify(body, null, 2));
  console.log('[Parsed Message]', input);

  // Create conversation
  const conversationRes = await fetch(
    `${process.env.PLAYLAB_API_BASE}/projects/${process.env.PLAYLAB_PROJECT_ID}/conversations`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PLAYLAB_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Isa Idea Session',
        description: 'AI-generated idea based on client input',
      }),
    }
  );

  const convoData = await conversationRes.json();
  const conversationId = convoData?.conversation?.id;

  if (!conversationId) {
    return NextResponse.json({ error: 'Conversation failed' }, { status: 500 });
  }

  // Send message to conversation
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
  console.log(messageData)
  // console.log('AI message response:', JSON.stringify(messageData, null, 2));

  // Try to extract the idea from several possible locations
  const summary =
    messageData.completion ||
    messageData.text ||
    messageData.message?.content ||
    messageData.choices?.[0]?.message?.content ||
    messageData.idea ||
    'No response from AI.';

  // Optionally, return the full messageData for debugging in development
  // return NextResponse.json({ idea: summary, debug: messageData });

  return NextResponse.json({ idea: summary });
}