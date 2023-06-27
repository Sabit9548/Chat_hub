import React from "react";
import Profile from "../img/user.png";
import { format } from "timeago.js";
const Message = ({owner,messages}) => {

  return (
    <div className={owner? "message owner" :"message"}>
      <div className="messageInfo">
        <img
          src={Profile}
          alt=""
        />
        <span>{format(messages.createdAt)}</span>
      </div>
      <div className="messageContent">
        <p>{messages.text}</p>        
      </div>
    </div>
  );
};

export default Message;
