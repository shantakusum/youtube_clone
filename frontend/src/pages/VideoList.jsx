import React, {useState, useEffect} from 'react'
import axios from "axios"
import { VideoCard } from "../component/VideoCard";

export const VideoList = () => {
    const [video, setVideo] = useState([]);
    useEffect( () =>{
        getVideo();
    }, []);

    const getVideo = async() => {
        try{
            const response = await axios.get("http://localhost:5000/v1/videos");
            setVideo(response.data);
           // console.log(response);
        }
        catch(error){
            console.log(error)
        }
    }
    
  return (
    <>
        <div  className="m-9 flex flex-wrap">
            {video.map((item) => 
                <VideoCard key={item.VideoId} video={item} />
             )}

        </div>
    
    </>
  )
}
