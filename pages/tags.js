import { useState } from 'react';
import Header from '../components/Header';
import Link from 'next/link';

function Tags() {
  const [tags, setTags] = useState([
    'Tag1',
    'Tag2',
    'Tag3',
    // Список тегов
  ]);

  // Функция для добавления нового тега
  const addTag = () => {
    const newTag = prompt('Введите новый тег');
    if (newTag) {
      setTags(prevTags => [...prevTags, newTag]);
    }
  };

  return (
    <div>
    <Header />
    <h1>Теги</h1>
    <div className="tags-list">
      {tags.map(tag => (
        <Link href={`/tags/${tag}`} key={tag} passHref>
          <div className="tag-item">
            <span>{tag}</span>
          </div>
        </Link>
      ))}
    </div>
    <button onClick={addTag}>
      Добавить тег
    </button>
  </div>
);
}

export default Tags;