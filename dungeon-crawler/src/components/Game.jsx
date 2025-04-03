import React from 'react';
import GameCanvas from './GameCanvas.jsx';
import GameLevel from '../models/GameLevel.js';
import CharacterCanvas from './CharacterCanvas.jsx';
import Player from './Player.jsx';
import { useSelector } from 'react-redux';
import './Game.css';


const Game = () => {
  const playerPosition = useSelector((state) => state.player.playerPosition);
  const gameLevel = new GameLevel(20);
  const player = { 
    x: playerPosition.x,
    y: playerPosition.y,
    color: 'blue',
    size: 30,
  };
  const objects = [player];

  return (
    <div className="canvas-container">
      <h1> Press arrow keys to move the player. </h1>
      <GameCanvas gameLevel={gameLevel} />
      <CharacterCanvas objects={objects} />
      <Player />
    </div>
  );
};


export default Game;
