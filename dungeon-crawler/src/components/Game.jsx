
import React, { useState, useEffect } from 'react';
import GameCanvas from './GameCanvas.jsx';
import CharacterCanvas from './CharacterCanvas.jsx';
import Player from './Player.jsx';
import MainMenu from './Menu.jsx';
import { startEnemyAI } from "../utils/enemyAI.js";
import './Game.css';

const Game = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);

  useEffect(() => {
    if (isGameStarted) {
      startEnemyAI();
    }
  }, [isGameStarted]);

  const handleStartGame = () => {
    setIsGameStarted(true);
  };

  return (
    <div className="canvas-container">
      {isGameStarted ? (
        <>
          <GameCanvas />
          <CharacterCanvas />
          <Player />
        </>
      ) : (
        <MainMenu onStartGame={handleStartGame} />
      )}
    </div>
  );
};

export default Game;