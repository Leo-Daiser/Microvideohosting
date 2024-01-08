const Tag = require('../models/tag');

const TagController = {
  async getAllTags(req, res) {
    try {
      const tags = await Tag.getAllTags();
      res.json(tags);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = TagController;
