import React from 'react';
import { usePlayerMovement } from '../hooks/usePlayerMovement.jsx';
import KeyPressListener from './KeyPressListener.jsx';

const keyPressToAction = {
  ArrowUp: 'UP',
  ArrowDown: 'DOWN',
  ArrowLeft: 'LEFT',
  ArrowRight: 'RIGHT',
  // add more actions here
};

const PlayerControls= () => {
  const { movePlayer } = usePlayerMovement();

  const handleKeyPress = (key) => {
    const action = keyPressToAction[key];

    if (action) {
      movePlayer(action);
    }
  };

  return (
    <>
      <KeyPressListener onKeyPress={handleKeyPress} />
    </>
  );
};

export default PlayerControls;
