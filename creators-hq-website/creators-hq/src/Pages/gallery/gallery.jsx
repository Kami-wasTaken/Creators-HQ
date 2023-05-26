import "./gallery.css";
import Navbar from "../../Components/Navbar"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
 
const Gallery = () => {

  const [currentFilter, setCurrentFilter] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {

    const interval = setInterval(() => {
      console.log(window.$filter, window.$user)
      if(window.$filter === "Iconography"){
        fetch("http://localhost:5000/get_images_iconography").then((res) =>
        res.json().then((data) => {
          // Setting a data from api
          setData(data);}))
      }
      if(window.$filter === "Painting"){
        fetch("http://localhost:5000/get_images_painting").then((res) =>
        res.json().then((data) => {
          // Setting a data from api
          setData(data);}))
      }
      if(window.$filter === "Sculpture"){
        fetch("http://localhost:5000/get_images_sculpture").then((res) =>
        res.json().then((data) => {
          // Setting a data from api
          setData(data);}))
      }
      if(window.$filter === "Engraving"){
        fetch("http://localhost:5000/get_images_engraving").then((res) =>
        res.json().then((data) => {
          // Setting a data from api
          setData(data);}))
      }
      
    }, 4000);

    return () => clearInterval(interval);
    

}, []);
  
  
  return (
    <>
    <Navbar/>
      <div className="message_thread">
        <div className="container">
          <div className="message_header">
            <h1>{window.$filter}</h1>
            <Link to='/message' className='m_nav'>Go to Messages</Link>
          </div>
          <div className="gallery_view">
            {data.map((i)=>{
              return(
                <div className="gallery_picture">
                  <img src={i[0]} alt=""/>
                </div>

              )
            })}
          </div>
        </div>
      </div>
    </>
    
  )
}

export default Gallery