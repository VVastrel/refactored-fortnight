import React from 'react';
import GameCanvas from './GameCanvas.jsx';
import CharacterCanvas from './CharacterCanvas.jsx';
import Player from './Player.jsx';
import './Game.css';

const Game = () => {
  return (
    <div className="canvas-container">
      <GameCanvas />
      <CharacterCanvas />
      <Player />
    </div>
  );
};

export default Game;
