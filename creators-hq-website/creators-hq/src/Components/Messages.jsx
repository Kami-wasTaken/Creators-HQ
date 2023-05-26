import React from 'react'
import Message from './Message'
import { useState, useEffect } from 'react';





const Messages = () => {
  const [messages, setMessages] = useState([]);
  
  
  
  useEffect(() => {

        const interval = setInterval(() => {
          console.log(window.$filter, window.$user)
          if(window.$filter === "Iconography"){
            fetch("http://localhost:5000/get_messages_iconography").then((res) =>
            res.json().then((data) => {
              // Setting a data from api
              setMessages(data);}))
          }
          if(window.$filter === "Painting"){
            fetch("http://localhost:5000/get_messages_painting").then((res) =>
            res.json().then((data) => {
              // Setting a data from api
              setMessages(data);}))
          }
          if(window.$filter === "Sculpture"){
            fetch("http://localhost:5000/get_messages_sculpture").then((res) =>
            res.json().then((data) => {
              // Setting a data from api
              setMessages(data);}))
          }
          if(window.$filter === "Engraving"){
            fetch("http://localhost:5000/get_messages_engraving").then((res) =>
            res.json().then((data) => {
              // Setting a data from api
              setMessages(data);}))
          }
          
        }, 5000);
    
        return () => clearInterval(interval);
        
    
}, []);



  return (
    <div className="messages">
        {messages.map((m)=>(
          <Message message={m}/>
        ))}
    </div>
  )
}

export default Messages