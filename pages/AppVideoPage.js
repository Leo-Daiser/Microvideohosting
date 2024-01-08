import React, { useState } from 'react';

const AddVideoPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <div>
      <h1>Добавить видео</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {}
        <button type="submit">Добавить</button>
      </form>
    </div>
  );
};

export default AddVideoPage;
