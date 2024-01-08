const Video = require('../models/video');

const VideoController = {
  async getLatestVideos(req, res) {
    try {
      const latestVideos = await Video.getLatestVideos();
      res.json(latestVideos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = VideoController;
