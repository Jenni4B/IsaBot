import type { NextApiRequest, NextApiResponse } from 'next';
import { getPlaylabSummary } from '@/app/lab/playlab';

export default async function summaryhandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { checkins } = req.body;

  if (!Array.isArray(checkins) || checkins.length === 0) {
    return res.status(400).json({ error: 'Missing or invalid check-in data' });
  }

  try {
    const summary = await getPlaylabSummary(checkins);
    return res.status(200).json({ summary });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Playlab summary generation failed' });
  }
}
