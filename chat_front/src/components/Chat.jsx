import React, { useContext,useEffect, useState } from "react";
import axios from "axios";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ConversationsContext } from "../context/ConversationsContext";
import { AuthContext } from "../context/AuthContext";
import Profile from "../img/user.png";

const Chat = ({imptoSocket}) => {
  const [ user, setUser ] = useState(null);
  const { id } = useContext(AuthContext);
  const { currentChat } = useContext(ConversationsContext);
 
  useEffect(() => {
    // console.log(currentUser);
     if(currentChat.members){
     const friendId = currentChat.members.find((m) => m !== id);
     //console.log(friendId);
     
     const getUser = async () => { 
       try {
         const res = await axios(`http://localhost:8000/api/users?userId=${friendId}`);
         setUser(res.data);
       } catch (err) {
         console.log(err);
       }
     };
    getUser();
     }
   }, [currentChat]);
   //console.log(currentChatuser);
  return (
    <div className="chat">
      <div className="chatInfo">
      <span><img src={Profile} alt=""/><div>{user?.username}</div></span>
        <div className="chatIcons">
          
        </div>
      </div>
      <Messages/>
      <Input imptoSocket={imptoSocket}/>
    </div>
  );
};

export default Chat;
