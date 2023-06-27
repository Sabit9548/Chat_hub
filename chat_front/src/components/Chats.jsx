import Profile from "../img/user.png";
import React,{ useContext, useEffect, useState } from "react";
import axios from "axios";


const Chats = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
   // console.log(currentUser);
    const friendId = conversation.members.find((m) => m !== currentUser);
    
    const getUser = async () => { 
      try {
        const res = await axios(`http://localhost:8000/api/users?userId=${friendId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [conversation._id]);


  return (
    <div className="chats">
        <div className="userChat" >
          <img src={Profile} alt="" />
          <div className="userChatInfo">
            <span className="conversationName">{user?.username}</span>
          </div>
        </div>
    </div>
  );
};

export default Chats;
