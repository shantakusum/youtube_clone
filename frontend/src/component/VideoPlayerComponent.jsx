import React  from 'react'
import { createPlayer} from '@videojs/react';
import { VideoSkin, Video, videoFeatures } from '@videojs/react/video';
import '@videojs/react/video/skin.css';


const Player = createPlayer({ features: videoFeatures });



export const VideoPlayerComponent = ({card}) => {
  
  return (
    <>
        <Player.Provider>
            <VideoSkin poster={card.Thumbnail_url}>
                <Video src={card.Video_url} playsInline />
            </VideoSkin>
        </Player.Provider>
    
    </>
  )
}
