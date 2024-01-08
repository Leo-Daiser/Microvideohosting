function VideoPlayer({ src }) {
    return (
      <div>
        <video controls>
          <source src={src} type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
      </div>
    );
  }
  
  export default VideoPlayer;
  