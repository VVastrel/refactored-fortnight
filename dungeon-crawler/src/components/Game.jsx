import React from 'react';
import GameCanvas from './GameCanvas.jsx';
import GameLevel from '../models/GameLevel.js';
import CharacterCanvas from './CharacterCanvas.jsx';
import Player from './Player.jsx';
import { useSelector } from 'react-redux';
import './Game.css';
import playerImage from '../assets/spriteSheet.png';


const Game = () => {
  const playerPosition = useSelector((state) => state.player.playerPosition);
  const gameLevel = new GameLevel(20);
  const player = { 
    x: playerPosition.x,
    y: playerPosition.y,
    color: 'red',
    size: 30,
    image: playerImage,
    frameWidth: 32, // Width of a single frame in the spritesheet
    frameHeight: 32, // Height of a single frame in the spritesheet
    frameIndex: 0, // Start at the first frame
    totalFrames: 2, // Total number of frames in the spritesheet
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
 

