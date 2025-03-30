import React from 'react';
import PlayerControls from './PlayerControls.jsx';
import PlayerCharacter from './PlayerCharacter.jsx';

const Player = () => {
  return (
    <div className="player">
      <PlayerCharacter />
      <PlayerControls />
    </div>
  );
};


export default Player;
