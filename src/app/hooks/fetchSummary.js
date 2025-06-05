// Fetches AI summary for a client's check-ins and returns the summary string

export const fetchSummary = async (checkins) => {
  const res = await fetch('/api/summary', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ checkins }),
  });

  const data = await res.json();
  console.log('[Playlab Response]', JSON.stringify(data, null, 2));
  return data.summary || 'No summary returned.';
};