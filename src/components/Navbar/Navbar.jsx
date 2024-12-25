import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";
import musicImage from "../../Images/music-note.png";
import { useDispatch, useSelector } from "react-redux";
import { setRoute } from "../../Redux/Features/MusicSlice/MusicSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig/firebaseConfig";
function NavBar() {
  const navigate = useNavigate();
  const route = useSelector((state) => state.Stage.route);
  const dispatch = useDispatch();
  console.log(route);
  const [click, setClick] = useState(false);
  const handleClick = (route) => {
    dispatch(setRoute(`${route}`));
  };
  const logout = () =>{
    signOut(auth).then(() => {
        navigate('/login');
      }).catch((error) => {
      });
}

  return (
    <> 
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo" onClick={() => navigate("/")}>
            <span className="logo">PMusic</span>
            <span className="icon">
              <img src={musicImage} alt="PMusic Logo" />
            </span>
          </div>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item" onClick={() => handleClick("allmusic")}>
              <div className="nav-links">Music</div>
            </li>
            <li className="nav-item" onClick={() => handleClick("playlist")}>
              <div className="nav-links">Playlist</div>
            </li>
            <li className="nav-item" onClick={() => handleClick("user")}>
              <div className="nav-links">User</div>
            </li>
            <li className="nav-item" onClick={logout}>
              <div className="nav-links">Logout</div>
            </li>
          </ul>

          <div className="nav-icon" onClick={() => setClick(!click)}>
            {click ? (
              <span className="icon">
                <HamburgetMenuClose />
              </span>
            ) : (
              <span className="icon">
                <HamburgetMenuOpen />
              </span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
