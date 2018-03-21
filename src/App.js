import React, { Component } from 'react';
import logo from './icons/logo.png';
import Field from './components/Field/Field.js';
import './App.css';

class App extends Component {
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Minesweeper</h1>
        </header>
        <Field />
      </div>
    );
  }
}

export default App;
