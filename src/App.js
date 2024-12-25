import { useSelector } from 'react-redux';
import './App.css';
import { Allmusic } from './components/Allmusic';
import NavBar from './components/Navbar/Navbar';
import { Playlist } from './components/Playlist';
import { User } from './components/User';
import { MainMusicPlayer } from './components/musicplayer/MainMusicPlayer';
function App() {
  const route = useSelector((state)=>state.Stage.route);
  console.log(route)
    return (
    <div className="App mb-6">
      <NavBar />
      {route=="allmusic" ? <Allmusic /> : route == "playlist" ? <Playlist /> : route == "user" ? <User/> : route == "mainmusic" ? <MainMusicPlayer /> : <Allmusic />}
     </div>
  );
}

export default App;
