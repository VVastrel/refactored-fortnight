import { React, useEffect } from 'react';
import GameCanvas from './GameCanvas.jsx';
import CharacterCanvas from './CharacterCanvas.jsx';
import Player from './Player.jsx';
import { startEnemyAI } from "../utils/enemyAI.js";
import './Game.css';

const Game = () => {

  useEffect(() => {
    startEnemyAI();
  }, []);

  return (
    <div className="canvas-container">
      <GameCanvas />
      <CharacterCanvas />
      <Player />
    </div>
  );
};

export default Game;
