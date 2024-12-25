import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
export const MainMusicPlayer = () => {
  return (
      <div>
        <div className="W-[80%] h-[500px]">
          <img src="" alt="image" />
        </div>
        <div>
          <AudioPlayer
            className="h-32"
            autoPlay
            // src={song}
            onPlay={(e) => console.log("onPlay")}
            // other props here
          />
        </div>
      </div>
  );
};
