import {createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { ConversationsContext } from "./ConversationsContext";
export const MessageContext = createContext();

export const MessageContextProvider = ({children})=> {
    const { id } = useContext(AuthContext);
    const { currentChat } = useContext(ConversationsContext);
    const [ messages, setMessages ] = useState([]);
    const [ newMessage, setNewMessage ] = useState("");
    //console.log(currentChat);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/messages/${currentChat._id}`).then(res => {
      // console.log(res.data);
        setMessages(res.data);
    });
  },[currentChat]);
  return (
    <MessageContext.Provider value={{ messages, setMessages ,newMessage, setNewMessage}}>
      {children}
    </MessageContext.Provider>
  );
}