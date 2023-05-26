import Header from '../../Components/Header'
import './home.css';
import Wave from "../../Assets/Wave.svg";
import React from 'react';
import Navbar from '../../Components/Navbar';
import Filter from '../../Components/Filter';
import { Link } from 'react-router-dom';
import Message from '../message/message';
import Gallery from '../gallery/gallery';


let filterid = 0;

const Home = () => {


  const setFilter = async (i) => {
    filterid = i;
    
  }

  
  
  return (
    <>
    <div className="body_container">
    <Navbar/>
    <div className="home_organizer">
    <Header/>
    <div className='filters_section'>
      <div className = 'filters'>
        <div className = 'container'>
        <h2 className="filter_sectionname">Art Styles to Explore</h2>
        <div className="filter_frame">
        <div onClick={()=>setFilter(0)} className="filter1">
          <h3 className="style_name">Iconography</h3>
          <Link to='/message' onClick={async () => {
                  window.$filter = "Iconography"
                  const response = await fetch("http://localhost:5000/set_current_filter", 
                  { method: "POST",
                  headers: 
                  { 'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': 'no'}, 
                  body: JSON.stringify(window.$filter)})}} 
                  className="gallery_direct">
                  <h3>Messaging Thread</h3></Link>
          <Link to='/gallery' onClick={async () => {
                  window.$filter = "Iconography"
                  const response = await fetch("http://localhost:5000/set_current_filter", 
                  { method: "POST",
                  headers: 
                  { 'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': 'no'}, 
                  body: JSON.stringify(window.$filter)})}}  className="message_direct"><h3>Gallery</h3></Link>
        </div>
        <div onClick={()=>setFilter(1)} className="filter2">
          <h3 className="style_name">Painting</h3>
          <Link to='/message' onClick={async () => {
                  window.$filter = "Painting";
                  const response = await fetch("http://localhost:5000/set_current_filter", 
                  { method: "POST",
                  headers: 
                  { 'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': 'no'}, 
                  body: JSON.stringify(window.$filter)})}} className="gallery_direct"><h3>Messaging Thread</h3></Link>
          <Link to='/gallery' onClick={async () => {
                  window.$filter = "Painting"
                  const response = await fetch("http://localhost:5000/set_current_filter", 
                  { method: "POST",
                  headers: 
                  { 'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': 'no'}, 
                  body: JSON.stringify(window.$filter)})}} className="message_direct"><h3>Gallery</h3></Link>
        </div>
        <div onClick={()=>setFilter(2)} className="filter3">
          <h3 className="style_name">Sculpture</h3>
          <Link to='/message' onClick={async () => {
                  window.$filter = "Sculpture"
                  const response = await fetch("http://localhost:5000/set_current_filter", 
                  { method: "POST",
                  headers: 
                  { 'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': 'no'}, 
                  body: JSON.stringify(window.$filter)})}} className="gallery_direct"><h3>Messaging Thread</h3></Link>
          <Link to='/gallery' onClick={async () => {
                  window.$filter = "Sculpture"
                  const response = await fetch("http://localhost:5000/set_current_filter", 
                  { method: "POST",
                  headers: 
                  { 'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': 'no'}, 
                  body: JSON.stringify(window.$filter)})}} className="message_direct"><h3>Gallery</h3></Link>
        </div>
        <div onClick={()=>setFilter(3)} className="filter4">
          <h3 className="style_name">Engraving</h3>
          <Link to='/message' onClick={async () => {
                  window.$filter = "Engraving"
                  const response = await fetch("http://localhost:5000/set_current_filter", 
                  { method: "POST",
                  headers: 
                  { 'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': 'no'}, 
                  body: JSON.stringify(window.$filter)})}}  className="gallery_direct"><h3>Messaging Thread</h3></Link>
          <Link to='/gallery' onClick={async () => {
                  window.$filter = "Engraving"
                  const response = await fetch("http://localhost:5000/set_current_filter", 
                  { method: "POST",
                  headers: 
                  { 'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': 'no'}, 
                  body: JSON.stringify(window.$filter)})}} className="message_direct"><h3>Gallery</h3></Link>
        </div>
        </div>
        </div>
        </div>
        </div>
    </div>

    </div>
    
    
    </>
  )
}

export default Home