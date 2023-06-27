
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ConversationsContext } from '../context/ConversationsContext';
import axios from "axios";
import { MessageContext } from "../context/MessageContext";
import { io } from 'socket.io-client'

const Input = ({imptoSocket}) => {
  const { id } = useContext(AuthContext);
  const { currentChat } = useContext(ConversationsContext);
  const { messages,setMessages,newMessage, setNewMessage } = useContext(MessageContext);
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: id,
      text: newMessage,
      conversationId: currentChat._id
    };
    imptoSocket();
    try {
      const res = await axios.post("http://localhost:8000/api/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
    
  };

  return (
    <div className="input">
      <div className="input_border">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      </div>
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSubmit}>Send</button>
      </div>
    </div>
  );
};

export default Input;
