const express = require('express');
const { Pool } = require('pg');
const multer = require('multer'); 

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'myuser',
  host: 'localhost',
  database: 'mydatabase',
  password: 'mypassword',
  port: 5432,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/videos');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Загрузка видео
app.post('/api/upload-video', upload.single('videoFile'), async (req, res) => {
  const { title, description } = req.body;
  const videoFilePath = req.file.path; // Путь к сохраненному файлу
  try {
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO videos (title, description, video_file_path) VALUES ($1, $2, $3) RETURNING *',
      [title, description, videoFilePath]
    );
    const newVideo = result.rows[0];
    client.release();
    res.status(201).json(newVideo);
  } catch (err) {
    console.error('Error adding video', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Получение списка видео
app.get('/api/videos', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM videos');
    const videos = result.rows;
    client.release();
    res.json(videos);
  } catch (err) {
    console.error('Error fetching videos', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
