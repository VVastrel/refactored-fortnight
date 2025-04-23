import { useDispatch, useSelector } from "react-redux";
import { setPlayerPosition, selectPlayerPosition } from "../redux/reducers/playerSlice";
import { checkCollision } from "../utils/collisionUtils";
import { handleTileInteraction } from "../utils/handleTileInteraction";
import { GameWorld } from "../core/GameWorld";
import GameLoop from "../core/GameLoop";
import { GRID_SIZE } from "../config/constants";
import { logMessage } from "../utils/GameLogger";

export const usePlayerMovement = () => {
  const dispatch = useDispatch();
  const playerPosition = useSelector(selectPlayerPosition);
  const isDead = useSelector((state) => state.player.isDead);

  const movePlayer = (direction) => {
    if (isDead) {
      console.log("Dead men can't walk! (Except Mr. Skeleton)");
      return;
    }

    if (!direction || !playerPosition) return;

    const newPosition = { ...playerPosition };

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
      return;
    }

    // Get current tile from GameWorld
    const tile = GameWorld.getTile(newPosition.x, newPosition.y);
    if (!tile) {
      console.warn("Tile not found at position:", newPosition);
      return;
    }

    if (tile.type === "stair") {
      logMessage("stair");
      GameLoop.newLevel();
      return;
    }

    const player = GameWorld.getObject("player");
    if (!player) {
      console.warn("Player object not found in GameWorld.");
      return;
    }

    // Handle tile interaction (combat, items, etc.)
    const blocked = handleTileInteraction(tile, player, dispatch);
    if (blocked) return;

    // Move player
    player.sprite.setDirection(direction);
    player.setPosition(newPosition.x, newPosition.y);
    dispatch(setPlayerPosition(newPosition));
    //console.log("Player Position:", newPosition);

    // If in turn mode, trigger enemy AI
    if (GameLoop.getMode() === "turn") {
      GameLoop.runTurn();
    }
  };

  return { movePlayer };
};
