import {Link, NavLink} from 'react-router-dom'
import {links} from '../data'
import {GoThreeBars} from 'react-icons/go'
import {MdOutlineClose} from 'react-icons/md'
import "./navbar.css";
import React, { useState } from "react";
import { currentUser } from '../Pages/login/login';



const Navbar = () => {
    const [isNavShowing, setIsNavShowing] = useState(false);

  return (
    <nav>
        
        <div className="container nav_container">
        <Link to="/home" className="web_title" onClick={() => setIsNavShowing(false)}>
            Creator's HQ
        </Link>
            <ul className={`nav_links ${isNavShowing ? 'show_nav' : 'hide_nav'}`}>
                {
                    links.map(({name, path}, index) => {
                        return(
                            <li className="orange_links" key={index}>
                            <NavLink to={path} className={({isActive}) => isActive ? 'active_nav' : 
                            ''} onClick={() => setIsNavShowing(prev => !prev)}>{name}</NavLink>
                            </li>
                        )
                    })
                }
                <li className="login" onClick={() => setIsNavShowing(prev => !prev)}>
                    <Link to="/" className="login_name" onClick={async () => {
                  
                  const response = await fetch("http://localhost:5000/sign_out", 
                  { method: "POST",
                  headers: 
                  { 'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': 'no'}, 
                  body: 'signed out'})
                  }}>SIGN OUT</Link>
                </li>
            </ul>
            <button className="nav_toggle_btn" onClick={() => setIsNavShowing(prev => !prev)}>
                {
                    isNavShowing ? <MdOutlineClose/> : <GoThreeBars/> 
                }
            </button>
        </div>
    </nav>
  )
}

export default Navbar