const pool = require('../db/config');
const { getLatestVideosQuery } = require('../db/queries');

const Video = {
  async getLatestVideos() {
    try {
      const latestVideos = await pool.query(getLatestVideosQuery);
      return latestVideos.rows;
    } catch (error) {
      return error.message;
    }
  },
  // Другие методы модели видео...
};

module.exports = Video;
