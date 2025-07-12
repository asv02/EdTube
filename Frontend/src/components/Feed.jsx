import { useEffect } from "react";
import { addFeed } from "../utils/appSlice";
import { YT_API_KEY } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import VideoCard from './VideoCard'
import ShimmerUi from "./ShimmerUi";


const Feed = () => {
  const dispatch = useDispatch();

  const handleFeed = async () => {
    const data = await fetch(
      "https://www.googleapis.com/youtube/v3/search?part=snippet&q=machine+learning&type=video&maxResults=20&key=" +
        YT_API_KEY
    );

    if (!data.ok) {
      throw new Error("Error in fetching Videos from Source.");
    }
    const res = await data.json();
    dispatch(addFeed(res));
    console.log(res);
  };

  useEffect(() => {
    handleFeed();
  }, []);
  
  const data  = useSelector((store)=>store?.FeedReducer?.items)
  console.log("data->",data)
  return !data ? <ShimmerUi/>: (
    <div className="flex flex-wrap justify-center gap-4 p-4 sm:grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
       {data?.map((res)=>
        {
            return <VideoCard key={res?.id?.videoId} thumbnail={res?.snippet?.thumbnails?.high?.url} title={res?.snippet?.title} channelTitle={res?.snippet?.channelTitle}/>
        })}
    </div>
  );
};

export default Feed;
