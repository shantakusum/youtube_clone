'use client';

import React, {useState, useEffect} from 'react'
import {useParams, useLocation} from 'react-router-dom'
import axios from 'axios'

import {SuggestedListCard} from '../component/SuggestedListCard'
import { VideoPlayerComponent } from '../component/VideoPlayerComponent';
import { VideoPlayerLiveComponent } from '../component/VideoPlayerLiveComponent';
import { VideoPlayerHlsComponent } from '../component/VideoPlayerHlsComponent';
import { CommentSection } from '../component/CommentSection';

// (?.) its called optional chaining  ye nested object ki value ko saftely access krta hai.

//Agar state exist karti hai to video do, warna error mat do, undefined return kar do.
//location.state.video; if use . insted of ?. then it give error (Cannot read properties of undefined (reading 'video') // undefined.video)


export const VideoPlayer = () => {
const location = useLocation();
const playVideoCard = location.state?.video;   // video come from state={{video}} which is in VideoCard here {{video} ye object hi}
//playVideoCard me data kuch is type se  aayega (getVideo API) se data aayega
// [
//     {
//         VideoId: "1",
//         Title: "React Tutorial",
//         Description: "Learn React",

//         Categories: [
//             {
//                 CategoryId: "A",
//                 Category_Name: "React"
//             },
//             {
//                 CategoryId: "B",
//                 Category_Name: "JavaScript"
//             }
//         ]
//     },

//     {
//         VideoId: "2",
//         Title: "Node Tutorial",

//         Categories: [
//             {
//                 CategoryId: "C",
//                 Category_Name: "Node"
//             }
//         ]
//     }
// ]

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
const v = (playVideoCard.Video_url.split('.')).reverse()
  return (
    <>
        <div className="grid grid-flow-col grid-cols-12 gap-2">
            <div className='col-span-9'>
                <div className='m-4'>
                    {playVideoCard.VideoType === 'live' ? <VideoPlayerLiveComponent card={playVideoCard} /> : 
                     v[0]=== 'm3u8' ? <VideoPlayerHlsComponent card={playVideoCard}/> : <VideoPlayerComponent card={playVideoCard} />}
                </div>
                <div className="m-4">
                    <h1 className="text-3xl font-bold">
                        {playVideoCard.Title}   
                    </h1>
                    <div className="mt-4 flex items-center gap-4 text-gray-500">

                        <span>👁 {playVideoCard.Views} Views</span>

                        <span>⏱ Like</span>

                        <span>⏱  Duration </span>

                    </div>
                    <div className="mt-4 flex items-center gap-4 text-gray-500">
                        {playVideoCard?.Categories.map((item)=>
                            <span key={item.CategoryId}>#{item.Category_Name}</span>
                        )}
                    </div>
                    <div className="mt-4">

                        <h2 className="font-semibold text-lg mb-4">
                            Description
                        </h2>

                        <p className="p-4 h-14 text-gray-700 leading-7 line-clamp-1 rounded-xl bg-gray-100">
                            {playVideoCard.Description}
                        </p>

                    </div>
                    <div className="mt-4">
                        <CommentSection videoId= {playVideoCard.VideoId} />
                    </div>
                </div>
            </div>  
            <div className="col-span-3">
                <div className='m-4 flex flex-col gap-4'>
                    {listVideo.map((item) => 
                        <div className="w-full" key={item.VideoId}>
                            <SuggestedListCard key={item.VideoId} listVideo= {item} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    </>
  )
}
