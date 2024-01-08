import executeQuery from 'utils/db/db.js';

async function fetchVideos() {
  try {
    const queryText = 'SELECT * FROM videos';
    const videos = await executeQuery(queryText);
    console.log('Список видео:', videos);
    return videos;
  } catch (error) {
    console.error('Ошибка при получении списка видео:', error);
    throw error;
  }
}

// Вызываем функцию для получения списка видео
fetchVideos();
