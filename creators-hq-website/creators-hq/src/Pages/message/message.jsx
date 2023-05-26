import './message.scss';
import Chat from '../../Components/Chat';
import Navbar from '../../Components/Navbar';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Message = () => {

  const [currentFilter, setCurrentFilter] = useState('');
  
  
 
   
  

  return (
    <>
    <Navbar/>
      <div className="message_thread">
        <div className="container">
          <div className="message_header">
            <h1>{window.$filter}</h1>
            <Link to='/gallery' className='m_nav'>Go to Gallery</Link>
            </div>
          <div className="chat_wrapper">
        <Chat/>  
        </div>
      </div>
    </div>
    </>
  )

}

export default Message