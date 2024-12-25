import React from "react";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './musicplayer.css';
import { useDispatch, useSelector } from "react-redux";
import { selectMusic, setRoute } from "../../Redux/Features/MusicSlice/MusicSlice";
import { useCommon } from "../../customHooks/useCommon";

export const MusicPlayer = (props) => {
  const playlists = props.playlists || [];
  const currentSongIndex = props.currentSongIndex || 0;  // Default to the first song if not provided
  const setCurrentSongIndex = props.setCurrentSongIndex || (() => {});  // Default to no-op function if not provided
  const music = useSelector((state) => state.Stage.music);
  const click = useSelector((state) => state.Stage.click);

  const handleNextSong = () => {
    // Increment the index or reset if at the end
    setCurrentSongIndex((prevIndex) =>
      prevIndex < playlists.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePreviousSong = () => {
    // Decrement the index or go to the last song if at the start
    setCurrentSongIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : playlists.length - 1
    );
  };

  const currentSong = playlists[currentSongIndex];

  let audioSrc = '';
  if (playlists.length > 0) {
    // If playlists exist, use the current song's title
    audioSrc = `/Musics/${currentSong.title}.m4a`;
  } else if (click) {
    audioSrc = `/Musics/${music}.m4a`;
  }

  return (
    <div className="w-[90%] p-4">
      <AudioPlayer
        className="h-32"
        autoPlay={playlists.length > 0} 
        src={audioSrc}
        onPlay={(e) => console.log("Playing:", currentSong?.title || music)}
        onEnded={handleNextSong}  // Play next song when the current song ends
        showSkipControls={playlists.length > 0} 
        onClickNext={handleNextSong}  // Skip to the next song
        onClickPrevious={handlePreviousSong}  // Skip to the previous song
      />
    </div>
  );
};
