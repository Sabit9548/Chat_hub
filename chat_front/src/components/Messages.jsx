import { useEffect, useContext, useState, useRef } from "react";
import Message from "./Message";
import { ConversationsContext } from '../context/ConversationsContext';
import axios from "axios"
import { AuthContext } from "../context/AuthContext";
import { MessageContext } from "../context/MessageContext";

const Messages = () => {
  const { id } = useContext(AuthContext);
  const { messages } = useContext(MessageContext);
  //console.log(currentChat);
  const scrollRef = useRef();
  const exp={text:"new chat start! now"}

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="messages">
      {messages.length?(
        <>
          {messages.map(m=>(
            <div ref={scrollRef}>
            <Message owner={id === m.sender} messages={m} key={m._id}/>
            </div>
          ))} 
        </>
      ):(
        <Message owner={true} messages={exp}/>
      )} 
    </div>
  );
};
/*
        <Message owner={false}/>
        <Message owner={true}/>
        <Message owner={false}/>
        <Message owner={false}/>
        <Message owner={true}/>
        <Message owner={false}/>
        <Message owner={false}/>
        <Message owner={true}/>
        <Message owner={false}/>
        <Message owner={false}/>
 */

export default Messages;
