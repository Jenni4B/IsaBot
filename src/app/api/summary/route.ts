import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Step 1: Parse and validate input
    const { checkins } = await req.json();

    if (!Array.isArray(checkins) || checkins.length === 0) {
      return NextResponse.json(
        { error: 'Missing or invalid check-in data' },
        { status: 400 }
      );
    }

    // Step 2: Prepare message body for Playlab
    const safeCheckins = Array.isArray(checkins) && checkins.length > 0
      ? checkins
      : ['No check-ins provided.'];

    const messageBody = {
      input: {
        message: safeCheckins.join('\n'),
      },
    };

    console.log('[Sending message to Playlab]', messageBody);

    // Step 3: Create a new conversation
    const conversationResponse = await fetch(
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

    const convoData = await conversationResponse.json();
    const conversationId = convoData?.conversation?.id;

    if (!conversationId) {
      console.error('[Playlab] Failed to create conversation:', convoData);
      return NextResponse.json(
        { error: 'Failed to create conversation', details: convoData },
        { status: 500 }
      );
    }

    // Step 4: Send the message to the conversation
    const messageResponse = await fetch(
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

    const messageData = await messageResponse.json();
    console.log('[Playlab] Response:', JSON.stringify(messageData, null, 2));

    const summary =
      messageData.completion || messageData.text || JSON.stringify(messageData);

    // Step 5: Return summary
    return NextResponse.json({ summary });

  } catch (error) {
    // Catch all errors and log them
    console.error('[Playlab Summary Error]', error);
    return NextResponse.json(
      { error: 'Failed to fetch summary from Playlab' },
      { status: 500 }
    );
  }
}
