import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { input } = await req.json();

  if (!input || typeof input !== 'string') {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const messageBody = 
  {
    input: {
      message: input,
    },
  };

  
  console.log('Generating idea for input:', input);
  console.log('Message body:', messageBody);

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
  // console.log('AI message response:', messageData);
  console.log('AI message response:', JSON.stringify(messageData, null, 2));

  const summary =
    messageData.completion || messageData.text || 'No response from AI.';

  return NextResponse.json({ idea: summary });
}
