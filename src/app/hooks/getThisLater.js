// Fetches AI summary for a client's check-ins and returns the summary string

// const fetchSummary = async (checkins: string[]): Promise<string> => {
//   const res = await fetch('/api/summary', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ checkins }),
//   });

//   if (!res.ok) {
//     throw new Error('Failed to fetch summary');
//   }

//   const data = await res.json();
//   return data.summary;
// };
