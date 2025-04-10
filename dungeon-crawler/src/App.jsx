import React from 'react';
import Game from './components/Game.jsx';

const App = () => {
  return (
    <div className="app-container">
      <h1> Press arrow keys to move the player. </h1>
      <Game />
    </div>
  );
};

export default App;
