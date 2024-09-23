import React, { useState, useEffect } from 'react';
import './App.css';

function Signup() {
  

  

  const handleClick = () => {
    setMessage('You clicked the button!');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>{message}</h1>
        <button onClick={handleClick}>Click Me</button>
      </header>
    </div>
  );
}

export default Signup;
