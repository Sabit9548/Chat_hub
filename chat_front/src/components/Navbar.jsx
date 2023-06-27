import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Profile from "../img/user.png";
const Navbar = () => {
  const {username,id} = useContext(AuthContext);
  const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
  return (
    <div className='navbar'>
      <span className="logo">ChatHub</span>
      <div className="user">
      <img src={Profile} alt="" />
        <span>{username}</span>
        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  )
}

export default Navbar;