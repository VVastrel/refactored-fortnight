import { useDispatch, useSelector } from "react-redux";
import { setPlayerPosition, addItemToInventory } from "../redux/reducers/playerSlice";
import { removeGameObjectFromTile } from "../redux/reducers/mapSlice";
import { checkCollision } from "../utils/collisionUtils";
import { selectGameLevel } from "../redux/reducers/mapSlice";
import { selectPlayerPosition } from "../redux/reducers/playerSlice";

export const usePlayerMovement = () => {
  const dispatch = useDispatch();
  const playerPosition = useSelector(selectPlayerPosition);
  const gameLevel = useSelector(selectGameLevel);

  const GRID_SIZE = 20;

  const movePlayer = (direction) => {
    if (!direction || !playerPosition || !gameLevel) return;

    const newPosition = { ...playerPosition };

    switch (direction) {
      case 'UP':
        newPosition.y -= 1;
        break;
      case 'DOWN':
        newPosition.y += 1;
        break;
      case 'LEFT':
        newPosition.x -= 1;
        break;
      case 'RIGHT':
        newPosition.x += 1;
        break;
      default:
        return;
    }

    // Bounds check
    if (
      newPosition.x < 0 || newPosition.x >= GRID_SIZE ||
      newPosition.y < 0 || newPosition.y >= GRID_SIZE
    ) {
      console.log("Out of bounds.");
      return;
    }

    // Check for collision
    const isCollision = checkCollision(newPosition);
    if (isCollision) {
      console.log("Blocked by wall.");
      return;
    }

    // Get tile at new position
    const tile = gameLevel.getTile(newPosition.x, newPosition.y);
    if (!tile) {
      console.warn("Invalid tile.");
      return;
    }

    // Check for item
    const item = tile.getGameObjects().find((obj) => obj.type === "item");
    if (item) {
      console.log("Picked up item:", item.id);
      dispatch(addItemToInventory(item));
      dispatch(removeGameObjectFromTile({
        x: newPosition.x,
        y: newPosition.y,
        gameObjectId: item.id,
      }));
    }

    // Move player
    dispatch(setPlayerPosition(newPosition));
    console.log("Player Position:", newPosition);
  };

  return { movePlayer };
};
