// TODO: Get current playerPosition

import { setPlayerPosition } from '../redux/actions/playerActions.js';
import { useDispatch, useSelector } from 'react-redux';


// TODO: Check for collision before moving

// this is just placeholder 
const checkCollision = (newPosition) => {
  console.log('Collision check:', newPosition);
  return false;
};

export const usePlayerMovement = () => {
  const dispatch = useDispatch();
  const playerPosition = useSelector(state => state.player.playerPosition);

  const movePlayer = (direction) => {

    if (direction) {
      let newPosition = { ...playerPosition }; // Get current position from Redux

      switch (direction) {
        case 'UP':
          newPosition.y -= 1; // Move up
          break;
        case 'DOWN':
          newPosition.y += 1; // Move down
          break;
        case 'LEFT':
          newPosition.x -= 1; // Move left
          break;
        case 'RIGHT':
          newPosition.x += 1; // Move right
          break;
        default:
          break;
      }

      // Check for collision before updating the position
      if (!checkCollision(newPosition)) {
        // Dispatch the action to update the player's position in Redux
        dispatch(setPlayerPosition(newPosition));
        console.log('Player Position:', newPosition);
      } else {
        console.log('Collision detected! Cannot move.');
      }
    }
  };

  return { movePlayer };
};
