import pool from 'utils/db/db.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM videos');
    const videos = result.rows;
    client.release();
    res.status(200).json(videos);
  } catch (err) {
    console.error('Error fetching videos', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
