import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('Hello, React!');

  useEffect(() => {
    console.log('Component mounted!');
    return () => {
      console.log('Component unmounted!');
    };
  }, []);

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

export default App;
