import React from 'react';
import Header from 'components/Header';
import Link from 'next/link';

const { Pool } = require('pg'); // добавьте эту строку для импорта Pool из модуля pg


const pool = new Pool({
  user: 'myuser', 
  host: 'localhost', 
  database: 'mydatabase', 
  password: 'mypassword', 
  port: 5432, 
});

const TagsPage = () => {
  return (
    <div>
      <Header />
      <h1>Теги</h1>
      {/* контент для страницы с тегами */}
    </div>
  );
};
function TagVideos({ tag, videos }) {
  return (
    <div>
      <h1>Видео по тегу: {tag}</h1>
      <div className="videos-grid">
        {videos.map(video => (
          <div className="video-card" key={video.id}>
            <Link href={`/video/${video.id}`}>
              <div>
                <img src={video.thumbnail} alt={video.title} />
                <h2>{video.title}</h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const tag = params.tag;

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM videos WHERE tags @> ARRAY[$1]', [tag]);
    const videos = result.rows;
    client.release();

    return {
      props: {
        tag,
        videos,
      },
    };
  } catch (error) {
    console.error('Error fetching videos by tag', error);
    return {
      props: {
        tag,
        videos: [],
      },
    };
  }
}

export default TagVideos;
