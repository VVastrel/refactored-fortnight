import React, { useEffect } from 'react';
import { movePlayer } from '../controllers/PlayerMovementController';


const InputHandler = ({ keyPress }) => {
  useEffect(() => {
    if (keyPress && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(keyPress)) {
      movePlayer(keyPress);
    }
  }, [keyPress]);

  return null;
};

export default InputHandler;
