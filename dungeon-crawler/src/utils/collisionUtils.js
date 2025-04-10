import store from "../redux/store"; // To access Redux state

export const checkCollision = (position) => {
  const state = store.getState();
  const gameLevel = state.map.gameLevel;

  if (!gameLevel || !gameLevel.getTile) {
    console.warn("Game level not ready or invalid:", gameLevel);
    return true; // Fail-safe: prevent movement
  }

  const tile = gameLevel.getTile(position.x, position.y);

  if (!tile || tile.type === "wall") {
    return true;
  }

  return false;
};
