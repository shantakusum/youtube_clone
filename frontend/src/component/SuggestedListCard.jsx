import React from 'react'
import {Link} from 'react-router-dom'

export const SuggestedListCard = ({listVideo}) => {
  return (
    <>
        <Link to={`/video/${listVideo.VideoId}`} state={{video: listVideo}}>
            <div className="w-full h-40  overflow-hidden shadow-lg  bg-mauve-50">
                <div className="flex">
                    <img className="w-40 h-35" src={listVideo.Thumbnail_url} alt="Sunset in the mountains"></img>
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">
                            <h1 className="text-xl font-bold text-gray-800 line-clamp-1">{listVideo.Title}</h1>
                        </div>
                        
                        <p className="text-gray-700 text-base line-clamp-1 overflow-hidden text-ellipsis">
                            {listVideo.Description}  
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    </>
  )
}

