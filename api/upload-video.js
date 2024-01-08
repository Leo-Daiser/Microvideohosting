import formidable from 'formidable';
import { saveVideoToDB } from './db/videos'; // Функция для сохранения видео в базе данных

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error parsing form data' });
    }

    const { title, description } = fields;
    const videoFile = files.videoFile.path; // Путь к загруженному видео

    try {
      const videoData = {
        title,
        description,
        videoFile,
      };

      const newVideo = await saveVideoToDB(videoData); // Сохранение видео в базе данных

      res.status(201).json(newVideo);
    } catch (error) {
      console.error('Error uploading video', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
}
