import store from "../redux/store.js";
import GameLevel from "../models/GameLevel.js";

export const checkCollision = (position) => {
  const rawLevel = store.getState().map.gameLevel;

  if (!rawLevel) {
    console.warn("Game level not ready.");
    return true;
  }

  // Rehydrate as real GameLevel class
  const gameLevel = Object.assign(new GameLevel(rawLevel.size), rawLevel);

  const tile = gameLevel.getTile(position.x, position.y);

  if (!tile || tile.type === "wall") {
    console.log("Blocked:", tile);
    return true;
  }

  return false;
};
