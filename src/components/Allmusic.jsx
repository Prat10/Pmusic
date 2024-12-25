import React, { useEffect, useState } from "react";
import { Search } from "./SearchInput/Search";
import { TfiControlPlay, TfiControlPause } from "react-icons/tfi";
import MusicObject from "../music.json";
import { MusicPlayer } from "./musicplayer/MusicPlayer";
import { useDispatch, useSelector } from "react-redux";
import {setMusic,selectMusic,setPlaylistData, setClick} from '../Redux/Features/MusicSlice/MusicSlice';
export const Allmusic = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  let click = useSelector((state)=>state.Stage.click);
  const array = Array(MusicObject.length).fill(false);
  const [play, setPlay] = useState(array);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter music based on search query
  const filteredMusic = MusicObject.filter((song) =>
    song.title.toLowerCase().includes(query.toLowerCase())
  );
  // Calculate pagination
  const totalItems = filteredMusic.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMusic.slice(indexOfFirstItem, indexOfLastItem);
  
  console.log(currentItems)
  // Handle page change
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handlePlay = (index, action,music) => {
    const updatedPlay = play.map((_, i) => i === index && action === "play");
    dispatch(setMusic(music));
    dispatch(setClick(!click));
    // console.log(music)
    setPlay(updatedPlay);
  }
  return (
    <div className="flex flex-col items-center min-h-screen">
      <div>
        <Search query={query} setQuery={setQuery}/>
      </div>
        {currentItems.length == 0 ? <div className="mt-4 text-[#FFE5B4]">No Music Found.</div> : ""}
        {currentItems.map((obj, index) => (
          <div
            className="w-[80%] mx-[10%] mt-4 h-[70px] flex justify-between bottom-2"
            key={index}
          >
            <div className="p-4 text-[#FFE5B4] shadow-lg">
              {indexOfFirstItem + index + 1}. {obj.title}
            </div>
            <div className="p-4">
              {play[index] ? (
                <TfiControlPause
                  onClick={() => handlePlay(index, "pause")}
                  className="text-2xl text-[#FFE5B4]"
                />
              ) : (
                <TfiControlPlay
                  onClick={() => handlePlay(index, "play",obj.title)}
                  className="text-2xl text-[#FFE5B4]"
                />
              )}
            </div>
          </div>
        ))}
      {/* </div> */}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-24">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`px-4 py-2 mx-1 ${
              currentPage === page ? "bg-[#FFDAB9] text-black" : "bg-gray-200"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <MusicPlayer/>
    </div>
  );
};
