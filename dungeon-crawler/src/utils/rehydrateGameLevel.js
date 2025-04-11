import GameLevel from "../models/GameLevel";
import store from "../redux/store";

export const rehydrateGameLevel = () => {
  const raw = store.getState().map.gameLevel;

  if (!raw || !raw.grid || typeof raw.size !== "number") {
    console.warn("Failed to rehydrate GameLevel. Invalid structure:", raw);
    return null;
  }

  return Object.assign(new GameLevel(raw.size), raw);
};
