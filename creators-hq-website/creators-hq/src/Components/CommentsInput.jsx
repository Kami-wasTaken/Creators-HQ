import React from 'react'
import { useState, } from 'react';
import { IoSend } from 'react-icons/io5';

const CommentsInput = () => {
    const [text, setText] = useState("")
    
    const handleChange = event => {
        setText(event.target.value)
        console.log(text)
    }
    
    const onSubmitComment = async event => {
        event.preventDefault();
        
        
        
          
          const commentData = [
            window.$user,
            text,
            
            
        ]
          const response = fetch("http://localhost:5000/store_comment", 
                          { method: "POST",
                          headers: 
                          { 'Content-Type': 'application/json',
                          'Access-Control-Allow-Origin': 'no'}, 
                          body: JSON.stringify(commentData)})
                          
    
                          console.log(commentData)
                          
                        }
  return (
    <div className="comment_input">
    <input type="text" value={text} placeholder='Add a comment' onChange={handleChange}/>
    <button id="send" onClick={onSubmitComment}>Send</button>
    
    
    </div>        
  )
}

export default CommentsInput