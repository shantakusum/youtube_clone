    import React from 'react'
    import {Link} from 'react-router-dom'
    import axios from 'axios'

    export const VideoCard = ({video}) => {
        
        const handleVideoClick = async (video) => {              //this handleVideoClick for increses views
        try {
             console.log("Clicked Video ID:", video.VideoId);
            const response = await axios.post(
                `http://localhost:5000/v1/videos/${video.VideoId}`
            );
            console.log("API Response:", response.data);
        } catch (error) {
            console.log(error);
        }
    };
    return (  
        <>
            {/*Card Body */}
            <div onClick={() => handleVideoClick(video)}>
                <Link to={`/video/${video.VideoId}`} state={{video}} >
                    <div className="w-lvw max-w-sm  rounded-[30px] overflow-hidden shadow-lg  mt-7 m-7 bg-white">
                        <img className="w-full h-48" src={video.Thumbnail_url} alt="Sunset in the mountains"></img>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">
                                <h1 className="text-xl font-bold text-gray-800 line-clamp-1"> {video.Title}</h1>
                            </div>
                            
                            <p className="text-gray-700 text-base line-clamp-1 overflow-hidden text-ellipsis">
                                {video.Description}
                            </p>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Views {video.Views}</span>
                            {video.Categories?.slice(0, 2).map((item)=>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" key={item.CategoryId}>#{item.Category_Name}</span>
                            )}
                            {/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Category</span> */}
                            {/* here slice(0, 2) is used for show only two categories which is form index 0 to index 1 */}
                            {/* <span className="inline-block  px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                <button className="w-2*1 mt-5 mx-4 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition whitespace-nowrap">
                                    Watch Now
                                </button>
                            </span> */}
                        </div>
                    </div>
                </Link>
            </div>
            {/* Card Body End */}
        </>
    )
    }
