import React from 'react'
import Signup from './pages/signup'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Signin from './pages/signin';
import OtpVerification from './pages/otpVerification';
import { useState } from 'react'
import './App.css'

function App() {


  return (
   <Router > 
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
    </Routes>
   </Router>
  )
}

export default App
