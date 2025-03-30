import React from 'react';
import { useSelector } from 'react-redux';


const PlayerCharacter = () => {
  const playerPosition = useSelector((state) => state.player.playerPosition);

  return (
    <div
      style={{
        position: 'absolute',
        left: playerPosition.x,
        top: playerPosition.y,
        width: '50px',
        height: '50px',
        backgroundColor: 'blue',
      }}
    />
  );
};

export default PlayerCharacter;
