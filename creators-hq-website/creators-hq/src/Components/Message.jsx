import PFP from '../Assets/PFP.jpeg'
import { useState, useEffect, useRef } from 'react'
import Comment from './Comment'
import { IoSend } from 'react-icons/io5';
import { BsFillChatSquareTextFill } from 'react-icons/bs';
import { RiEmotionHappyLine } from 'react-icons/ri'
import { RiEmotionUnhappyLine } from 'react-icons/ri'

import CommentsInput from './CommentsInput'




const Message = ({message}) => {
  
  
  const [comments, setComment] = useState([]);
  
  const ref = useRef()

  useEffect(()=>{
    ref.current?.scrollIntoView({ behavior: "smooth"})

  }, [message])

  function handleSubmit1(e) {
    e.preventDefault();
    window.$sentiment = ""
    
  }
  function handleSubmit2(e) {
    e.preventDefault();
    window.$sentiment = "Positive"
   
  }
  function handleSubmit3(e) {
    e.preventDefault();
    window.$sentiment = "Negative"
   
  }

  useEffect(() => {

    const interval = setInterval(() => {
      
      if(window.$sentiment === ""){
        fetch("http://localhost:5000/get_comments_all").then((res) =>
        res.json().then((data) => {
          // Setting a data from api
          setComment(data);}))
      }
      if(window.$sentiment === "Positive"){
        fetch("http://localhost:5000/get_comments_positive").then((res) =>
        res.json().then((data) => {
          // Setting a data from api
          setComment(data);}))
      }
      if(window.$sentiment === "Negative"){
        fetch("http://localhost:5000/get_comments_negative").then((res) =>
        res.json().then((data) => {
          // Setting a data from api
          setComment(data);}))
      }
      
      
    }, 5000);

    return () => clearInterval(interval);
    

}, []);



  
                    
  return (
    <div ref ={ref} className='message'>
      <div className={window.$user === message[0] ? "messageInfoSelf" : "messageInfoOther"}>
        <img src={PFP}></img>
        <p>{message[0]}</p>
      </div>
      <div className="messageContent">
        <p className="message_text">{message[1]}</p>
        {message[3] &&
        <div className="image_container">
          <img className="uploaded_img"src={message[3]} alt=""></img>
        <div className="comments_container">
          <div className="comments_header">
            <div className="comments_title">Comments</div>
            <div>
            <form onSubmit={handleSubmit1}>
              <button id="all" style={{ display: "none" }} type="submit">a</button>
              <label htmlFor="all">
              <BsFillChatSquareTextFill size={25}/>
            </label>
              </form>
              <form onSubmit={handleSubmit2}>
              <button style={{ display: "none" }}  id="positive" type="submit">p</button>
              <label htmlFor="positive">
              <RiEmotionHappyLine size={25}/>
            </label>
              </form>
              <form onSubmit={handleSubmit3}>
              <button style={{ display: "none" }}  id="negative" type="submit">n</button>
              <label htmlFor="negative">
              <RiEmotionUnhappyLine size={25}/>
            </label>
              </form>
              </div>
            </div>
          <div className="comments">
          {comments.map((c)=>(
          <Comment comment={c}/>
        ))}
          

          </div>
          <CommentsInput/>
        </div>
        
        </div>
        }
        
      
      </div>
    </div>
  )
}

export default Message