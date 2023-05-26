import React from 'react'
import PFP from '../Assets/PFP.jpeg'

const Comment = ({comment}) => {
  return (
    <div className="comment">
     <div className="comment_info">
        <img className="pfp" src={PFP}></img>
        <p className="comments_username">{comment[0]}</p>
      </div>
      <div className="commentContent">{comment[1]}</div>
    </div>
   
  )
}

export default Comment