const express = require('express');
const { Pool } = require('pg');
const multer = require('multer'); // Подключение multer

const app = express();

const pool = new Pool({
  user: 'myuser',
  host: 'localhost',
  database: 'mydatabase',
  password: 'mypassword',
  port: 5432,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/videos'); // Путь для сохранения видеофайлов
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 500 // Установка лимита до 500 МБ
  }
});

pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((err) => console.error('Error connecting to PostgreSQL', err));

app.use(express.json());
app.use('/uploads/videos', express.static('uploads/videos')); // Разрешение доступа к загруженным видеофайлам


// Получение списка видео
app.get('/videos', async (req, res) => {
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

// Добавление нового видео
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

// Получение видео по ID
app.get('/videos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM videos WHERE id = $1', [id]);
    const video = result.rows[0];
    client.release();
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json(video);
  } catch (err) {
    console.error('Error fetching video', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Редактирование существующего видео по ID
app.put('/videos/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, video_file_path } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query(
      'UPDATE videos SET title = $1, description = $2, video_file_path = $3 WHERE id = $4 RETURNING *',
      [title, description, video_file_path, id]
    );
    const updatedVideo = result.rows[0];
    client.release();
    res.status(200).json(updatedVideo);
  } catch (err) {
    console.error('Error updating video', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
