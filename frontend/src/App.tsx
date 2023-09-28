import React from 'react';
import './App.css';
import Tasks from './components/Tasks/Tasks';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>TODO List App</h1>
        <Tasks />
      </header>
    </div>
  );
}

export default App;
