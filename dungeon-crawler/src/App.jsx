import React from 'react';
import Player from './components/Player.jsx';
import GameCanvas from './components/GameCanvas.jsx';

const App = () => {
  return (
    <div className="app-container">
      <Player />
      <GameCanvas />
    </div>
  );
};

export default App;
