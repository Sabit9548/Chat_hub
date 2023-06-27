import React,{ useContext,useState } from "react";
import Navbar from "./Navbar"
import Search from "./Search"
import Chats from "./Chats"
import { AuthContext } from '../context/AuthContext'
import { ConversationsContext } from "../context/ConversationsContext";


const Sidebar = ({users}) => {
  const { id } = useContext(AuthContext);
  const { conversations,setCurrentChat } = useContext(ConversationsContext);


  return (
    <div className="sidebar">
      <Navbar/>
      <Search users={users}/>
      {conversations.map(c => (
        <div onClick={()=>setCurrentChat(c)} key={c._id}>
          <Chats conversation={c} currentUser={id} key={c._id}/> 
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
