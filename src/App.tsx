import React from 'react';
import logo from './logo.svg';
import './App.css';
import Cmenu from './Cmenu';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Cmenu />
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
