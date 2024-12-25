import { useState } from "react";
import allmusics from '../music.json';
export const useCommon = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [playlist,setPlaylist] = useState([allmusics]);

    const setPlaylistfunc = (songs=[])=>{
        setPlaylist(songs);
    }

    const playPlaylist = (musiclist=[]) =>{
      if(musiclist.length > 0){
        const currentPlayList = setPlaylistfunc(musiclist);
        return currentPlayList;
      }
      return playlist;
    }

    return {
        email,password,setEmail,setPassword,playPlaylist
    }
}
