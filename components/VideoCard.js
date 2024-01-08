import Link from 'next/link';

function VideoCard({ video }) {
  return (
    <div className="video-card">
      <Link href={`/video/${video.id}`}>
        <div>
          <img src={video.thumbnail} alt={video.title} />
          <h2>{video.title}</h2>
        </div>
      </Link>
    </div>
  );
}

export default VideoCard;
