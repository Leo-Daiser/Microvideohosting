import pool from 'utils/db/db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { title, description, tags, videoFile } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO videos (title, description, tags, video_file_path) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, tags, videoFile]
    );
    const newVideo = result.rows[0];
    client.release();
    res.status(201).json(newVideo);
  } catch (err) {
    console.error('Error adding video', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
