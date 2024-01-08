const pool = require('../db/config');
const { getAllTagsQuery } = require('../db/queries');

const Tag = {
  async getAllTags() {
    try {
      const tags = await pool.query(getAllTagsQuery);
      return tags.rows;
    } catch (error) {
      return error.message;
    }
  },
  // Другие методы модели тегов...
};

module.exports = Tag;
