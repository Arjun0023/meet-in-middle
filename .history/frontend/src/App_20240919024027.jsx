import React from 'react'
import Signup from './pages/signup'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import S
import { useState } from 'react'
import './App.css'

function App() {


  return (
   <Router > 
    <Routes>
      <Route path="/signup" element={<Signup />} />
    </Routes>
   </Router>
  )
}

export default App
