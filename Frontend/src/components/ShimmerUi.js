const ShimmerUi = () => {
  const shimmerArray = Array.from({ length: 9 });

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4 sm:grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      {shimmerArray.map((_, index) => (
        <div
          key={index}
          className="w-full sm:w-72 md:w-80 lg:w-96 animate-pulse"
        >
          <div className="card bg-base-200 shadow-md rounded-lg overflow-hidden">
            <div className="aspect-video bg-base-300" />
            <div className="card-body p-4 space-y-2">
              <div className="h-4 w-3/4 bg-base-300 rounded" />
              <div className="h-3 w-1/2 bg-base-300 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ShimmerUi;