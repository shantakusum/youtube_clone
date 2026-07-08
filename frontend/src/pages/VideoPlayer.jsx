'use client';

import React, {useState, useEffect} from 'react'
import {useParams, useLocation} from 'react-router-dom'
import axios from 'axios'

import {SuggestedListCard} from '../component/SuggestedListCard'
import { VideoPlayerComponent } from '../component/VideoPlayerComponent';
import { CommentSection } from '../component/CommentSection';

// (?.) its called optional chaining  ye nested object ki value ko saftely access krta hai.

//Agar state exist karti hai to video do, warna error mat do, undefined return kar do.
//location.state.video; if use . insted of ?. then it give error (Cannot read properties of undefined (reading 'video') // undefined.video)


export const VideoPlayer = () => {
const location = useLocation();
const playVideoCard = location.state?.video;   // video come from state={{video}} which is in VideoCard here {{video} ye object hi}

const [listVideo, setListVideo] = useState([]);
useEffect(() => {
    getListVideo();
}, []);

const getListVideo = async () => {
    try{
        const response = await axios.get("http://localhost:5000/v1/videos");
        setListVideo(response.data);
        // console.log(response.data);
    }
    catch(error){
        console.log(error)
    }
}
  return (
    <>
        <div className="flex flex-row">
            <div>
                <div className='m-5 w-350 h-175'>
                    <VideoPlayerComponent card={playVideoCard} />
                </div>
                <div className="mt-6">
                    <h1 className="text-3xl font-bold">
                        {playVideoCard.Title}   
                    </h1>
                    <div className="flex items-center gap-4 mt-3 text-gray-500">

                        <span>👁 25K Views</span>

                        <span>⏱ Duration</span>

                        <span>📂 Movies</span>

                    </div>
                    <div className="mt-5 p-5 rounded-xl bg-gray-100">

                        <h2 className="font-semibold text-lg mb-2">
                            Description
                        </h2>

                        <p className="text-gray-700 leading-7 line-clamp-1">
                            {playVideoCard.Description}
                        </p>

                    </div>
                    <div className="mt-6">
                        <CommentSection />
                    </div>
                </div>
            </div>  
            {/*left side suggested list item */}
            <div className="m-5 w-110 flex flex-col gap-5">
                        
                {listVideo.map((item) => 
                    <div className="w-full" key={item.VideoId}>
                        <SuggestedListCard key={item.VideoId} listVideo= {item} />
                    </div>
                )}
                
            </div>
        </div>
    </>
  )
}
