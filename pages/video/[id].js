function VideoPage() {
  const video = { id: 1, title: 'Видео 1', videoSrc: 'ссылка_на_видео', description: 'Описание видео' };

  return (
    <div>
      <h1>{video.title}</h1>
      <video controls>
        <source src={video.videoSrc} type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>
      <p>{video.description}</p>
    </div>
  );
}

export default VideoPage;
