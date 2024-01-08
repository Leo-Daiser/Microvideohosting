import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const mockVideos = [
  { id: 1, title: 'Видео 1', thumbnail: 'thumbnail1.jpg' },
  { id: 2, title: 'Видео 2', thumbnail: 'thumbnail2.jpg' },
  { id: 3, title: 'Видео 3', thumbnail: 'thumbnail3.jpg' },
  { id: 4, title: 'Видео 4', thumbnail: 'thumbnail4.jpg' },
  { id: 5, title: 'Видео 5', thumbnail: 'thumbnail5.jpg' },
  { id: 6, title: 'Видео 6', thumbnail: 'thumbnail6.jpg' },
];

const VideoThumbnail = ({ video }) => (
  <div style={{ width: '30%', margin: '10px', textAlign: 'center' }}>
    <Link href={`/video/${video.id}`} passHref>
      <div style={{ cursor: 'pointer' }}>
        <img src={video.thumbnail} alt={video.title} style={{ width: '100%' }} />
        <p>{video.title}</p>
      </div>
    </Link>
  </div>
);

const HomePage = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setVideos(mockVideos);
  }, []);

  return (
    <div>
      <nav>
        <ul className="tabs">
          <li>
            <Link href="/">
              <span>Главная</span>
            </Link>
          </li>
          <li>
            <Link href="/tags">
              <span>Теги</span>
            </Link>
          </li>
          <li>
            <Link href="/addVideo">
              <span>Добавить видео</span>
            </Link>
          </li>
        </ul>
      </nav>

      <h1>Главная</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {videos.map((video) => (
          <VideoThumbnail key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
