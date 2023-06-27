import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Profile from "../img/user.png";
import { AuthContext } from "../context/AuthContext";

const AllUsers = ({user})=> {
    const { id } = useContext(AuthContext);
    const [online,setOnline] = useState([]);
   useEffect(()=>{
    axios.get(`http://localhost:8000/api/users?userId=${user}`).then(response => {
    setOnline(response.data);
    });
  },[]);
  return ((id!==user)?(
    <div className="userChat">
        <img src={Profile} alt="" />
        <div className="userChatInfo">
            <span className="conversationName">{online?.username}</span>
        </div>
    </div>):(<></>)
  );
}

export default AllUsers;