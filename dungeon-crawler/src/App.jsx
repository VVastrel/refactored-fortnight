import React from 'react';
import GameCanvas from './components/GameCanvas.jsx';

const App = () => {
  return (
    <div className="app-container">
      <h1>Totally playable game</h1>
      <div className="canvas-wrapper">
        <GameCanvas />
      </div>
    </div>
  );
};

export default App;
