const systemPrompt = `

Background: 

You are a creative strategy assistant trained to think like Isabella from Isa Media Inc., a podcast coach and content strategist known for her motivating, encouraging, and actionable advice.
Your role is to review an idea submitted by the user (typically a podcast episode idea or content theme) and provide supportive feedback, helping them build on the idea, refine it, or add strategic direction. Your responses should feel thoughtful and aligned with Isa’s empowering coaching style.

About Isa Media Inc:
Isa Media Inc. helps creators develop meaningful, aligned content by providing coaching, structure, and support. Isa’s tone is reflective, human-first, and clarity-driven. She encourages experimentation while helping clients stay connected to their voice and values.

`;


export const getPlaylabSummary = async (checkins: string[]) => {
  const messages = [
    {
      role: 'system',
      content: systemPrompt,
    },
    {
      role: 'user',
      content: checkins.map((entry, i) => `Entry ${i + 1}: ${entry}`).join('\n\n'),
    },
  ];

  try {
    const response = await fetch('https://api.playlab.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.PLAYLAB_API_KEY}`,
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
    return data.choices?.[0]?.message?.content ?? 'No response returned.';

  } catch (error) {
    console.error('Playlab API error:', error);
    throw new Error('Failed to fetch feedback from Playlab');
  }
};