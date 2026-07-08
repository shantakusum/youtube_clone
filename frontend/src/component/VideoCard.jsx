import React from 'react'
import {Link} from 'react-router-dom'

export const VideoCard = ({video}) => {
  return (  
    <>
        {/*Card Body */}
        <Link to={`/video/${video.VideoId}`} state={{video}}>
            <div className="max-w-sm rounded-[30px] overflow-hidden shadow-lg  mt-7 m-7 bg-gray-300">
                <img className="w-full h-96" src={video.Thumbnail_url} alt="Sunset in the mountains"></img>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">
                        <h1 className="text-xl font-bold text-gray-800 line-clamp-1"> {video.Title}</h1>
                    </div>
                    
                    <p className="text-gray-700 text-base line-clamp-1 overflow-hidden text-ellipsis">
                        {video.Description}
                    </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Duration</span> 
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Category</span>
                    <span className="inline-block  px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    <button className="w-2*1 mt-5 mx-4 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition">
                            Watch Now
                        </button>
                    </span>
                </div>
            </div>
        </Link>
        {/* Card Body End */}
    </>
  )
}
