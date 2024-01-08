import pool from 'utils/db/db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { title, description, videoFile } = req.body;

  try {
    const client = await pool.connect();

    const result = await client.query(
      'INSERT INTO videos (title, description, video_data) VALUES ($1, $2, $3) RETURNING *',
      [title, description, videoFile]
    );

    const newVideo = result.rows[0];
    client.release();
    res.status(201).json(newVideo);
  } catch (err) {
    console.error('Error uploading video', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
