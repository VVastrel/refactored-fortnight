import React from 'react';
import GameCanvas from './GameCanvas.jsx';
import Player from './Player.jsx';

const Game = () => {
  return (
    <>
      <h1> Press arrow keys to move the player. </h1>
      <Player />
      <GameCanvas />
    </>
  );
};


export default Game;
