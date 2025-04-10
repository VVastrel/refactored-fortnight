import store from "../redux/store.js";
import GameLevel from "../models/GameLevel";

const directions = ["UP", "DOWN", "LEFT", "RIGHT"];

export const startEnemyAI = () => {
  setInterval(() => {
    const state = store.getState();
    if (state.game.isPaused || state.game.mode !== "realtime") return;
    const rawLevel = state.map.gameLevel;
    const gameLevel = Object.assign(new GameLevel(rawLevel.size), rawLevel);

    if (!gameLevel || !gameLevel.grid) return;

    gameLevel.grid.forEach((row) => {
      row.forEach((tile) => {
        tile.getGameObjects().forEach((obj) => {
          if (obj.type === "enemy") {
            const dir =
              directions[Math.floor(Math.random() * directions.length)];
            const moved = gameLevel.moveEnemy(obj.id, dir);
            if (moved) {
              console.log(`Enemy ${obj.id} moved ${dir}`);
            }
          }
        });
      });
    });

    // Optionally force canvas update if needed later
    // store.dispatch({ type: "map/update" }); // Add a dummy reducer if needed
  }, 1000);
};
