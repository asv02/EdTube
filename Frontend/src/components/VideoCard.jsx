const VideoCard = ({ thumbnail, title, channelTitle }) => {
  return (
    <div className="w-full sm:w-72 md:w-80 lg:w-96">
      <div className="card bg-base-200 shadow-md rounded-lg overflow-hidden transition-transform hover:scale-105">
        <figure className="aspect-video bg-base-100">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="card-body p-4">
          <h2 className="card-title text-base font-semibold truncate">{title}</h2>
          <p className="text-sm text-base-content/70 truncate">{channelTitle}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;