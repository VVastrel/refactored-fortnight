import { setPlayerPosition } from '../redux/actions/playerActions.js';
import { useDispatch, useSelector } from 'react-redux';
import { checkCollision } from '../utils/collisionUtils.js';

export const usePlayerMovement = () => {
  const dispatch = useDispatch();
  const playerPosition = useSelector(state => state.player.playerPosition);

  const GRID_SIZE = 20;

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

      if (
        newPosition.x >= 0 &&
        newPosition.x < GRID_SIZE &&
        newPosition.y >= 0 &&
        newPosition.y < GRID_SIZE
      ){

      // Check for collision before updating the position
      const isCollision = checkCollision(newPosition);

      if (!isCollision) {
        // Dispatch the action to update the player's position in Redux
        dispatch(setPlayerPosition(newPosition));
        console.log('Player Position:', newPosition);
      }
      } else {
        console.log('Collision detected! Cannot move.');
      }
    }
  };

  return { movePlayer };
};
