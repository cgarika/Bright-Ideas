import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DisplayAll from './views/DisplayAll'
import DisplayOne from './views/DisplayOne'
import Login from './views/Login'
import ViewOnePost from './views/ViewOnePost'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  return (
    <BrowserRouter>
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/display" element={<DisplayAll />} />
        <Route path="/display/:id" element={<DisplayOne />} />
        <Route path="/viewonepost/:id" element={<ViewOnePost />} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
