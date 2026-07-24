import React  from 'react'
import { createPlayer} from '@videojs/react';
import { LiveVideoSkin, Video, liveVideoFeatures } from '@videojs/react/live-video';
import '@videojs/react/live-video/skin.css';


const Player = createPlayer({ features: liveVideoFeatures });



export const VideoPlayerLiveComponent = ({card}) => {
  
  return (
    <>
        <Player.Provider>
            <LiveVideoSkin poster={card.Thumbnail_url}>
                <Video src={card.Video_url} playsInline autoPlay muted/>
            </LiveVideoSkin>
        </Player.Provider>
    
    </>
  )
}
