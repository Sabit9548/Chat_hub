import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Profile from "../img/user.png";
import React from "react";
import { json } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ConversationsContext } from "../context/ConversationsContext";
const Search = ({users}) => {
  const [ value, setValue ] = useState(null);
  const [ AllUsers,setAllUsers ] = useState([]);
  const { id } = useContext(AuthContext);
  const { setNewConversation } = useContext(ConversationsContext);
  useEffect(()=>{
    axios.get(`http://localhost:8000/api/users/usersList`).then(res => {
      //console.log(res.data);
        setAllUsers(res.data);
    });
  },[]);
  const onChange = (evevt)=>{
      setValue(evevt.target.value);
  }
    async function AddNewCoversation(user) {
      const res =await axios.post('http://localhost:8000/api/conversations',{ senderId:id,receiverId:user._id});
      console.log(res);
      setNewConversation(res);
    }

  //console.log(AllUsers)
  return (
    <div>
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Search or start new chat"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
      {AllUsers.filter(user => {
        const searchUser = value;
        const curr_user = user.username;

        return searchUser&&curr_user.startsWith(searchUser);
      }).map(user=>(
        <div className="userChat" onClick={()=>AddNewCoversation(user)}>
          <img src={Profile} alt="" />
          <div className="userChatInfo">
            <span className="conversationName">{user?.username}</span>
          </div>
        </div>
    ))}
    <div className="friends">Friends:</div>
    </div>
  );
};
export default Search;
