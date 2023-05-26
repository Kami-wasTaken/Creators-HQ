import React from 'react'
import '../Pages/message/message.scss'
import Messages from './Messages'
import Input from './Input'

const Chat = () => {
  return (
    <div className='chat'>
        <Messages/>
        <Input/>
        
        
     </div>
  )
}

export default Chat