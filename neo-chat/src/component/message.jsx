import React, { useEffect, useState } from "react";
import "./css/message.css";
import api from "../Layout/api";

export default function message({chatId,userId}) {
  const [msg,setMsg] = useState([]);

  useEffect(()=>{
    const fetchMessage = async()=>{
      try {
        const message = await api.get(`/chats/user/${userId}/${chatId}`);
        console.log(message);
      } catch (error) {
        console.log("Error Fetching Message:",error);
      }
    }
  },[])
  return (
    <div className="messageBox">
      <img src="https://cdn.dribbble.com/users/472667/screenshots/15343533/media/26aa942b41f6c4959d6feb68814dd598.png?resize=1200x900&vertical=center" />
    </div>
  );
}

//https://dribbble.com/shots/15343533/attachments/7103250?mode=media

