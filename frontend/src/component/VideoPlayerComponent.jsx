import React  from 'react'
import { createPlayer, useQualityOptions, selectQuality, usePlayer, selectStreamType,Menu} from '@videojs/react';
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




// function LiveIndicator() {
//   const stream = usePlayer(selectStreamType);
//   console.log(stream)
//   if (stream?.streamType !== 'live') return null;

//   return <span className="live-indicator">LIVE</span>;
// }

// function QualityInfo() {
//   const quality = useQualityOptions(selectQuality);

//   console.log(quality)
//   if (!quality) return null;

//   return (
//     <Menu.Root side="top" align="center">
//     <Menu.RadioGroup value={quality.value} onValueChange={quality.setValue}>
//         <Menu.GroupLabel>Quality</Menu.GroupLabel>
//         {quality.options.map((option) => (
//             <Menu.RadioItem key={option.value} value={option.value} disabled={option.disabled}>
//             {option.label}
//             <Menu.ItemIndicator checked={option.value === quality.value} />
//             </Menu.RadioItem>
//         ))}
//     </Menu.RadioGroup></Menu.Root>)
// }

