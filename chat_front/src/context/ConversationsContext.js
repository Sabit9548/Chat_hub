import {createContext, useEffect, useState, useContext} from "react";
import { AuthContext } from './AuthContext'
import axios from "axios"

export const ConversationsContext = createContext();

export const ConversationsContextProvider = ({children})=> {
    const { id } = useContext(AuthContext);
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState([]);
    const [ currentChatuser,setCurrentChatuser ] = useState(null);
    const [ newConversation, setNewConversation ] = useState(null);
  useEffect(() => {
    axios.get(`http://localhost:8000/api/conversations/${id}`).then(res => {
      // console.log(res.data);
      if(res.data.length){
        setConversations(res.data);
      }
    });
  },[id,newConversation]);
   //console.log(conversations);
    return (
        <ConversationsContext.Provider value={{ conversations, setConversations ,currentChat,setCurrentChat,currentChatuser,setCurrentChatuser,newConversation,setNewConversation }}>
          {children}
        </ConversationsContext.Provider>
      );

}