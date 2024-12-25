import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { MusicPlayer } from './musicplayer/MusicPlayer';

export const User = () => {
  const [songs,setSongs] = useState([]); 
  const playlistName = useSelector((state)=>state.Stage.currentPlay);
  const playlists = useSelector((state)=>state.Stage.playlists);
  const [isPlaying,setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  
  
  const getListSongs = () => {
    const res = playlists.find((item) => item.playlistName == playlistName);
    return res ? res.songs : [];
  }
  useEffect(()=>{
    if(playlistName != ""){
      let data = getListSongs();
      setSongs(data);
      setIsPlaying(true);
    }
  },[]);
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg, #4B0000 0%, rgba(0,0,0,1) 90%)] text-white flex flex-col items-center p-6">
      {/* Music Player */}
      <div className="flex flex-col items-center">
        <div className="relative w-40 h-40 rounded-full border-4 border-gray-500 shadow-lg flex items-center justify-center">
        <div
  className={`w-32 h-32 rounded-full bg-[#fffff] flex items-center justify-center ${isPlaying ? "bounce-animation" : ""}`}
>
  <span className="text-xl font-semibold text-[#FFDAB9]">
    {songs[currentSongIndex] ? songs[currentSongIndex].title : "No Song"}
  </span>
</div>
        </div>
        {/* <audio ref={audioRef} onEnded={playNextTrack} /> */}
      </div>
      <MusicPlayer playlists = {songs} currentSongIndex={currentSongIndex} setCurrentSongIndex={setCurrentSongIndex}/>

      {/* Playlist */}
      <div className="mt-8 w-full max-w-xl">
        <h2 className="text-2xl font-semibold mb-4">Playlist</h2>
        <ul className="space-y-4">
          {songs.map((song,index) => (
            <li
              key={song.id}
              className={`flex justify-between items-center p-4 rounded-lg ${currentSongIndex === index ? "bg-[#0000] text-[#FFDAB9]" : ""}`}
            >
              <div>
                <h3 className="text-lg">{song.title}</h3>
                <p className="text-sm">{song.artist}</p>
              </div>
              {currentSongIndex === index && (
                <div>
                  <img src={'/wave1.gif'}/>
                </div>
)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
