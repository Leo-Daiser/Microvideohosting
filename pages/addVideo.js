import React, { useState } from 'react';
import Header from '../components/Header';

const AddVideoPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [videoFile, setVideoFile] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/add-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, tags, videoFile }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const newVideo = await response.json();
      console.log('New video added:', newVideo);
      // Действия после успешного добавления видео

    } catch (error) {
      console.error('There was an error:', error);
    }
  };

  return (
    <div>
      <Header />
      <h1>Добавить видео</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="text"
          placeholder="Теги"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setVideoFile(e.target.files[0])}
        />
        <button type="submit">Добавить</button>
      </form>
    </div>
  );
};

export default AddVideoPage;
