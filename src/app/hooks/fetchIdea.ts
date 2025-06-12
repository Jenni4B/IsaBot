// Fetches AI summary for client input and returns the feedback string

export const fetchIdea = async (input: string): Promise<string> => {
  const res = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input }),
  });

  const data = await res.json();
  return data.idea || 'No idea returned.';
};
