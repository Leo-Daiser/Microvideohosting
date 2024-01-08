const express = require('express');
const app = express();

const videosRouter = require('./routes/videos');
const tagsRouter = require('./routes/tags');

app.use('/api/videos', videosRouter);
app.use('/api/tags', tagsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
