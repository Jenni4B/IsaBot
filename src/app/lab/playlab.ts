export const getPlaylabSummary = async (checkins: string[]) => {
  const prompt = `
You are IsaBot, a coaching assistant. Based on the following check-ins, summarize the client's progress and give one actionable insight.

Check-ins:
${checkins.map((entry, i) => `Entry ${i + 1}: ${entry}`).join('\n\n')}

Respond with:
Summary: ...
Coach Insight: ...
`;

  const response = await fetch('https://api.playlab.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.PLAYLAB_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{ role: 'system', content: prompt }],
    }),
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content ?? 'No summary returned.';
};