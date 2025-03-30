import React from 'react';
import PlayerControls from './PlayerControls.jsx';
import PlayerCharacter from './PlayerCharacter.jsx';

const Player = () => {

  return (
    <div>
      <h1> Press arrow keys to move the player. </h1>
      <PlayerControls />
      <PlayerCharacter />
    </div>
  );
};

export default Player;
