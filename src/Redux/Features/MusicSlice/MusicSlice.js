import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  route:"",
  music:"",
  click:false,
  playlistData:[ {
    "id": 1,
    "title": "Leave - Post Malone",
    "artist": "Ed Sheeran",
    "album": "Divide",
    "genre": "Pop",
    "duration": "3:53",
    "coverImage": "https://link.to/cover1.jpg",
    "musicUrl": "https://link.to/music1.mp3"
  },
  {
    "id": 2,
    "title": "Murder On My Mind - YNW Melly",
    "artist": "The Weeknd",
    "album": "After Hours",
    "genre": "Synthwave",
    "duration": "3:20",
    "coverImage": "https://link.to/cover2.jpg",
    "musicUrl": "https://link.to/music2.mp3"
  },
  {
    "id": 3,
    "title": "Suicidal - YNW Melly",
    "artist": "Adele",
    "album": "21",
    "genre": "Soul",
    "duration": "3:48",
    "coverImage": "https://link.to/cover3.jpg",
    "musicUrl": "https://link.to/music3.mp3"
  },
  {
    "id": 4,
    "title": "Unstoppable - Sia",
    "artist": "Billie Eilish",
    "album": "When We All Fall Asleep, Where Do We Go?",
    "genre": "Electropop",
    "duration": "3:14",
    "coverImage": "https://link.to/cover4.jpg",
    "musicUrl": "https://link.to/music4.mp3"
  },
  {
    "id": 5,
    "title": "What Do You Mean  - Justin Bieber",
    "artist": "Lil Nas X",
    "album": "7",
    "genre": "Country Rap",
    "duration": "2:37",
    "coverImage": "https://link.to/cover5.jpg",
    "musicUrl": "https://link.to/music5.mp3"
  },
],
  playlists:[],
  currentPlay:""
};

const MusicStage = createSlice({
  name: 'stage',
  initialState,
  reducers: {
    setRoute: (state, action) => {
      state.route = action.payload;
    },
    setMusic: (state, action) => {
      state.music = action.payload;
    },
    setPlaylistData:(state, action) =>{
      state.playlistData = action.payload;
    },
    addPlaylist: (state, action) => {
      // Adds a new playlist to the playlists array
      state.playlists.push({
        playlistName: action.payload.playlistName,
        songs: action.payload.songs || [],
      });
    },
    deletePlaylist: (state, action) => {
      const { playlistName } = action.payload;
      state.playlists = state.playlists.filter(
        (playlist) => playlist.playlistName !== playlistName
      );
    },
    setClick:(state,action) => {
      state.click = action.payload;
    },
    setCurrent:(state,action) => {
      state.currentPlay =action.payload;
    },
    getRoute: (state) =>{
      return state.route;
    },
  },
});

export const { setRoute, getRoute,setMusic,setPlaylistData,setClick,deletePlaylist,addPlaylist,setCurrent } = MusicStage.actions;

export default MusicStage.reducer;