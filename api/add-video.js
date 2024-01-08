import React, { useState } from 'react';
import Header from '../components/Header';

const AddVideoPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('videoFile', videoFile);

      const response = await fetch('/api/upload-video', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const newVideo = await response.json();
      console.log('New video added:', newVideo);
      // Действия после успешной загрузки видео

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
          type="file"
          onChange={(e) => setVideoFile(e.target.files[0])}
        />
        <button type="submit">Добавить</button>
      </form>
    </div>
  );
};

export default AddVideoPage;
