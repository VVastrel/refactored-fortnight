import { useDispatch, useSelector } from "react-redux";
import { setPlayerPosition, selectPlayerPosition, addItemToInventory } from "../redux/reducers/playerSlice";
import { checkCollision } from "../utils/collisionUtils";
import { selectGameLevel, removeGameObjectFromTile } from "../redux/reducers/mapSlice";
import { runEnemyTurn } from "../utils/enemyAI";
import GameLevel from "../models/GameLevel.js";
import { useSelector as useAppSelector } from "react-redux";

export const usePlayerMovement = () => {
  const dispatch = useDispatch();
  const playerPosition = useSelector(selectPlayerPosition);
  const rawLevel = useSelector(selectGameLevel);
  const gameMode = useAppSelector((state) => state.game.mode);

  const GRID_SIZE = 20;

  const movePlayer = (direction) => {
    if (!direction || !playerPosition || !rawLevel) return;

    const newPosition = { ...playerPosition };

    // Determine movement
    switch (direction) {
      case "UP": newPosition.y -= 1; break;
      case "DOWN": newPosition.y += 1; break;
      case "LEFT": newPosition.x -= 1; break;
      case "RIGHT": newPosition.x += 1; break;
      default: return;
    }

    // Bounds check
    if (
      newPosition.x < 0 || newPosition.x >= GRID_SIZE ||
      newPosition.y < 0 || newPosition.y >= GRID_SIZE
    ) {
      console.log("Out of bounds.");
      return;
    }

    // Collision check
    if (checkCollision(newPosition)) {
      console.log("Blocked by wall.");
      return;
    }

    // Rehydrate map and get tile
    const gameLevel = Object.assign(new GameLevel(rawLevel.size), rawLevel);
    const tile = gameLevel.getTile(newPosition.x, newPosition.y);

    if (!tile) {
      console.warn("Invalid tile.");
      return;
    }

    // Check for item and pick it up
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

    // Trigger enemy reaction in turn-based mode
    if (gameMode === "turn") {
      runEnemyTurn(newPosition, rawLevel); // handles AI + refreshMap
    }
  };

  return { movePlayer };
};
