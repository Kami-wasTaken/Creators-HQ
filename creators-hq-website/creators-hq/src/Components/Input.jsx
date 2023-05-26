import React from 'react'
import { IoSend } from 'react-icons/io5';
import { RiUploadCloud2Line } from 'react-icons/ri'
import { IconContext } from 'react-icons/lib';
import { useState, useEffect } from 'react';
import  currentUser  from '../Pages/login/login';
import currentFilter from '../Pages/message/message';


const Input = () => {
  const [text, setText] = useState("")
  const [file, setFile] = useState();
  const [filename, setFileName] = useState('Choose File');
 
  var currentdate = new Date(); 
  var datetime = currentdate.getFullYear()+"-"+(currentdate.getMonth()+1)+"-"+
  currentdate.getDate() + " "
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
  
  

                


  

  const onChange = e => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    
    setFile(null)
    
    

    if (file){
      fetch('http://localhost:5000/store_image', {
      method: 'POST',
      headers:
      {'Access-Control-Allow-Origin': 'no'}, 
      body: formData
    })
      
    }
    
      
      const messageData = [
        text,
        datetime,
        window.$filter,
        window.$user,
        
    ]
      const response = fetch("http://localhost:5000/store_message", 
                      { method: "POST",
                      headers: 
                      { 'Content-Type': 'application/json',
                      'Access-Control-Allow-Origin': 'no'}, 
                      body: JSON.stringify(messageData)})
                      

                      console.log(messageData)
                      
                    }
  

  


  return (
    <div className='input'>
      <input type="text" placeholder='Send a message...' onChange={e => setText(e.target.value)} />
      <div className='send'>
        <img src="" alt="" />
        <input type="file" style={{ display: "none" }} id="file" name="file" onChange={onChange} />
        <label htmlFor="file">
          <img src="" alt="" />
        </label>
        <div className='send'>
          <IconContext.Provider value={{ color: "#264653", size: '25px' }}>
            <button id="send" onClick={onSubmit} style={{ display: "none" }}>Send</button>
            <label htmlFor="send">
              <IoSend />
            </label>
            <input style={{ display: 'none' }} name="file" id="file" type="file"></input>
            <label htmlFor="file">
              <RiUploadCloud2Line />
            </label>
          </IconContext.Provider>
        </div>
      </div>
    </div>
  )
}

export default Input