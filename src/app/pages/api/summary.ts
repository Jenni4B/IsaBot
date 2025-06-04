import type { NextApiRequest, NextApiResponse } from 'next';
import { getPlaylabSummary } from '@/app/lab/playlab';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { checkins } = req.body;

  if (!Array.isArray(checkins) || checkins.length === 0) {
    return res.status(400).json({ error: 'Missing or invalid check-in data' });
  }

  try {
    const summary = await getPlaylabSummary(checkins);
    res.status(200).json({ summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get summary from Playlab' });
  }
}
