// TODO: Get current playerPosition
//
// TODO: Check for collision before moving

let playerPosition = { x: 0, y: 0 };

// Mapping of key presses to movement directions
const keyPressToDirection = {
  ArrowUp: 'UP',
  ArrowDown: 'DOWN',
  ArrowLeft: 'LEFT',
  ArrowRight: 'RIGHT',
};

export const movePlayer = (keyPress) => {
  const direction = keyPressToDirection[keyPress]; // Translate key press to direction

  if (direction) {
    switch (direction) {
      case 'UP':
        playerPosition.y -= 1; // Move up
        break;
      case 'DOWN':
        playerPosition.y += 1; // Move down
        break;
      case 'LEFT':
        playerPosition.x -= 1; // Move left
        break;
      case 'RIGHT':
        playerPosition.x += 1; // Move right
        break;
      default:
        break;
    }

    //TODO: do some magic here to move the player 
    console.log('Player Position:', playerPosition);
  }
};

export const getPlayerPosition = () => playerPosition;
