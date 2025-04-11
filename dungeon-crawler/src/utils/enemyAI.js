import store from "../redux/store.js";
import { refreshMap } from "../redux/reducers/mapSlice";
import GameLevel from "../models/GameLevel";

const directions = ["UP", "DOWN", "LEFT", "RIGHT"];

export const processEnemyTurn = (gameLevel, playerPosition) => {
  const enemies = [];

  gameLevel.grid.forEach((row) => {
    row.forEach((tile) => {
      tile.getGameObjects().forEach((obj) => {
        if (obj.type === "enemy") {
          enemies.push(obj);
        }
      });
    });
  });

  enemies.forEach((enemy) => {
    const dx = playerPosition.x - enemy.x;
    const dy = playerPosition.y - enemy.y;
    const distance = Math.abs(dx) + Math.abs(dy);

    let direction;

    if (distance <= 5) {
      if (Math.abs(dx) > Math.abs(dy)) {
        direction = dx > 0 ? "RIGHT" : "LEFT";
      } else {
        direction = dy > 0 ? "DOWN" : "UP";
      }
    } else {
      direction = directions[Math.floor(Math.random() * directions.length)];
    }

    gameLevel.moveEnemy(enemy.id, direction);
  });
};

// realtime mode
export const startEnemyAI = () => {
  setInterval(() => {
    const state = store.getState();
    if (state.game.isPaused || state.game.mode !== "realtime") return;

    const rawLevel = state.map.gameLevel;
    const gameLevel = Object.assign(new GameLevel(rawLevel.size), rawLevel);
    const playerPosition = state.player.playerPosition;

    if (!gameLevel || !gameLevel.grid) return;

    processEnemyTurn(gameLevel, playerPosition);
    store.dispatch(refreshMap());
  }, 1000);
};

// turn mode
export const runEnemyTurn = (playerPosition, rawLevel) => {
  const gameLevel = Object.assign(new GameLevel(rawLevel.size), rawLevel);
  processEnemyTurn(gameLevel, playerPosition);
  store.dispatch(refreshMap());
};
