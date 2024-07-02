import React from 'react';

import './App.css';

import TodoList from './TodoList';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1> Todo</h1>
        <TodoList />
      </header>
    </div>
  );
}

export default App;
