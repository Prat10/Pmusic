import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { RiPlayList2Line } from "react-icons/ri";
import {
  addPlaylist,
  deletePlaylist,
  setRoute,setCurrent
} from "../Redux/Features/MusicSlice/MusicSlice"; // Import your Redux actions
import Musiclist from "../music.json";
import { useNavigate } from "react-router-dom";

export const Playlist = () => {
  const dispatch = useDispatch();
  const playlists = useSelector((state) => state.Stage.playlists);

  const [isOpen, setIsOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [selectedMusic, setSelectedMusic] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(Musiclist.length / itemsPerPage);

  // Get music for the current page
  const currentMusic = Musiclist.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handlePlaylistNameChange = (e) => setPlaylistName(e.target.value);

  const handleMusicToggle = (music) => {
    setSelectedMusic((prevSelected) =>
      prevSelected.includes(music)
        ? prevSelected.filter((item) => item !== music)
        : [...prevSelected, music]
    );
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleSavePlaylist = () => {
    if (playlistName && selectedMusic.length > 0) {
      dispatch(
        addPlaylist({
          playlistName,
          songs: selectedMusic,
        })
      );
      closeModal();
      setPlaylistName("");
      setSelectedMusic([]);
    }
  };
  const handlePlaylist = (playlistName) =>{
    dispatch(setCurrent(playlistName));
    dispatch(setRoute(`user`));
  }

  const handleDeletePlaylist = (playlistName) => {
    dispatch(deletePlaylist({ playlistName }));
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="w-[90%] h-[550px] opacity-[60%] bg-[linear-gradient(180deg, #4B0000 0%, rgba(0,0,0,1) 90%)] mt-8">
        <p className="text-left px-[10%] mt-4 text-[#FFE5B4]">
          Explore Your Personalized Music Playlists:
        </p>
        <div className="flex justify-end mx-32">
          <button
            className="w-48 h-[3rem] bg-[#212f3d] text-white"
            onClick={openModal}
          >
            Create New
          </button>
        </div>

        {playlists.length > 0
         ? playlists.map((playlist, index) => (
          <div
            key={index}
            className="w-[80%] mx-[10%] mt-4 h-[80px] bg-white flex justify-between"
          >
            <div className="p-6 opacity-[60%] shadow-lg">
              <span className="text-xl text-[#000] font-bold opacity-[1]">
                {1+index} :
              </span>{" "}
              {playlist.playlistName}
            </div>
            <div className="p-6 flex w-[20%] justify-between">
              <RiPlayList2Line className="text-[2rem] cursor-pointer" onClick={() => handlePlaylist(playlist.playlistName)}/>
              <MdDelete
                className="text-[2rem] cursor-pointer"
                onClick={() => handleDeletePlaylist(playlist.playlistName)}
              />
            </div>
          </div>
        ))
       :
       <h1 className="text-2xl text-[#DAA520]">No Playlist..</h1>}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#4B0000] rounded-lg shadow-lg w-96" style={{background:"linear-gradient(180deg, rgba(51,0,0,0.8) 0%, rgba(26,0,0,0.3) 100%)"}}>
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b px-4 py-2">
              <h2 className="text-xl  text-[#F5DEB3]">Create Playlist</h2> 
            </div>

            {/* Modal Body */}
            <div className="p-4">
              <div className="mb-4">
                <label
                  htmlFor="playlistName"
                  className="block text-sm font-medium text-[#FFDAB9]"
                >
                  Playlist Name
                </label>
                <input
                  type="text"
                  id="playlistName"
                  value={playlistName}
                  onChange={handlePlaylistNameChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter playlist name"
                />
              </div>

              {/* Music Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Select Songs
                </label>
                <ul className="mt-2 space-y-2">
                  {currentMusic.map((music, index) => (
                    <li key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`music-${music.title}`}
                        value={music}
                        checked={selectedMusic.includes(music)}
                        onChange={() => handleMusicToggle(music)}
                        className="mr-2 bg-[#FFF5E1]"
                      />
                      <label htmlFor={`music-${music.title}`} className="text-[#E6E6FA]">
                        {music.title}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pagination */}
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 border rounded-lg ${
                    currentPage === 1
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Previous
                </button>
                <span className="text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 border rounded-lg ${
                    currentPage === totalPages
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end border-t px-4 py-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePlaylist}
                className="ml-2 px-4 py-2 bg-[#0A4D68] text-white rounded-lg hover:bg-blue-600"
              >
                Save Playlist
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
