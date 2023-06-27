import React, { useEffect, useState, useRef, useContext } from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import { io } from 'socket.io-client'
import { AuthContext } from '../context/AuthContext'
import { ConversationsContext } from '../context/ConversationsContext'
import { MessageContext } from '../context/MessageContext'


const Home = () => {
  const { user, id } = useContext(AuthContext);
  const socket = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { currentChat } = useContext(ConversationsContext);
  const { messages, setMessages, newMessage } = useContext(MessageContext);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  },[arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", id);
    socket.current.on("getUsers", (users) => {
    // console.log(users);
     setOnlineUsers(users);
      /*setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );*/
    });
  }, [id]);
  
  const imptoSocket = ()=>{
    const receiverId = currentChat.members.find(
      (member) => member !== id
    );
    
    socket.current.emit("sendMessage", {
      senderId: id,
      receiverId:receiverId,
      text: newMessage,
    });
  }

  return (
    <div className='home'>
      <div className="container">
        <Sidebar users={onlineUsers}/>
        <Chat imptoSocket={imptoSocket}/>
      </div>
    </div>
  )
}

export default Home