const pool = require('./config');

const getLatestVideosQuery = 'SELECT * FROM videos ORDER BY created_at DESC LIMIT 6';
const getAllTagsQuery = 'SELECT * FROM tags';

module.exports = {
  getLatestVideosQuery,
  getAllTagsQuery,
};
