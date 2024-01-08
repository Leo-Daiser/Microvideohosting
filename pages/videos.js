import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

const VideosPage = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/videos');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div>
      <Header />
      <h1>Список видео</h1>
      <div className="videos-list">
        {videos.map((video) => (
          <div className="video-item" key={video.id}>
            <h2>{video.title}</h2>
            <p>{video.description}</p>
            <video width="320" height="240" controls>
              <source src={video.video_file_path} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideosPage;
