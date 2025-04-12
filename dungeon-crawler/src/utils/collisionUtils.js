import { GameWorld } from "../core/GameWorld";

/**
 * Checks if the tile at the given position is blocked (wall or other logic).
 * Returns true if movement is blocked.
 */
export const checkCollision = (position) => {
  const tile = GameWorld.getTile(position.x, position.y);

  if (!tile) {
    console.warn(`No tile found at (${position.x}, ${position.y})`);
    return true;
  }

  if (tile.type === "wall") {
    console.log("Blocked by wall at:", position);
    return true;
  }

  return false;
};
