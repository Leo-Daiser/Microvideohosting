const express = require('express');
const router = express.Router();
const VideoController = require('../controllers/videoController');

router.get('/latest', VideoController.getLatestVideos);
// Другие маршруты...

module.exports = router;
