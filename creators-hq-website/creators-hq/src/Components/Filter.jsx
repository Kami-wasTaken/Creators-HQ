import "./Filter.css"
import Gallery from '../Pages/gallery/gallery';
import Message from '../Pages/message/message';
import { Link } from 'react-router-dom';
import { useState} from "react";


let filterid = 0;

const Filter = () => {

  const setFilter = async (i) => {
    filterid = i;
    console.log(filterid);
  }
  
  return (
    
        <div onClick={()=>setFilter(0)} className="filter">
          <h3 className="style_name">POP ART</h3>
          <Link to='/message' className="gallery_direct"><h3>Messaging Thread</h3></Link>
          <Link to='/gallery' className="message_direct"><h3>Gallery</h3></Link>
        </div>
        
  )
}

export default Filter()