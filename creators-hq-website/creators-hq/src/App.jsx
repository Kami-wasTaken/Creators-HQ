import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from './Pages/home/home'
import About from './Pages/about/about'
import Gallery from './Pages/gallery/gallery'
import Message from './Pages/message/message'
import Login from './Pages/login/login'
import Register from './Pages/Register/Register'



const App = () => {
 




  return (
    <BrowserRouter>
    <Routes>
    <Route index element={<Login/>}></Route>
    <Route path='about' element={<About/>}></Route>
    <Route path='home' element={<Home/>}></Route>
    <Route path='register' element={<Register/>}></Route>
    <Route path='message' element={<Message/>}></Route>
    <Route path='gallery' element={<Gallery/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App