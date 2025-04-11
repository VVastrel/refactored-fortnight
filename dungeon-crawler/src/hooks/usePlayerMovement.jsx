import { useDispatch, useSelector } from "react-redux";
import { setPlayerPosition, selectPlayerPosition } from "../redux/reducers/playerSlice";
import { selectGameLevel } from "../redux/reducers/mapSlice";
import { checkCollision } from "../utils/collisionUtils";
import { rehydratePlayer } from "../utils/rehydratePlayer";
import { rehydrateGameLevel } from "../utils/rehydrateGameLevel";
import { handleTileInteraction } from "../utils/handleTileInteraction";
import GameLevel from "../models/GameLevel";
import { runEnemyTurn } from "../utils/enemyAI";

export const usePlayerMovement = () => {
  const dispatch = useDispatch();
  const playerPosition = useSelector(selectPlayerPosition);
  const rawLevel = useSelector(selectGameLevel);
  const gameMode = useSelector((state) => state.game.mode);

  const GRID_SIZE = 20;

  const movePlayer = (direction) => {
    if (!direction || !playerPosition || !rawLevel) return;

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
      console.log("Blocked by wall.");
      return;
    }

    // Rehydrate state
    const gameLevel = rehydrateGameLevel();
    if (!gameLevel) {
      console.warn("Could not rehydrate GameLevel.");
      return;
    }

    const tile = gameLevel.getTile(newPosition.x, newPosition.y);
    if (!tile) {
      console.warn("Tile not found at position:", newPosition);
      return;
    }

    const player = rehydratePlayer();

    if (!tile || !player) return;

    // Handle tile interaction (e.g., combat, item pickup)
    const interactionBlockedMovement = handleTileInteraction(tile, player, dispatch);
    if (interactionBlockedMovement) return;

    // Move player
    dispatch(setPlayerPosition(newPosition));
    console.log("Player Position:", newPosition);

    // Run enemy turn in turn mode
    if (gameMode === "turn") {
      runEnemyTurn(newPosition, rawLevel);
    }
  };

  return { movePlayer };
};
