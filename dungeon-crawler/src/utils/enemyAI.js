import { rehydrateGameLevel } from "./rehydrateGameLevel";
import { rehydratePlayer } from "./rehydratePlayer";
import { performAttack } from "./combatUtils";
import store from "../redux/store";
import { refreshMap } from "../redux/reducers/mapSlice";

const directions = ["UP", "DOWN", "LEFT", "RIGHT"];

export const processEnemyTurn = (gameLevel) => {
  const player = rehydratePlayer();
  if (!player) return;

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
    const dx = Math.abs(enemy.x - player.x);
    const dy = Math.abs(enemy.y - player.y);
    const isAdjacent = dx + dy === 1;

    if (isAdjacent) {
      console.log(`${enemy.id} attacks the player!`);
      performAttack(enemy, player);
      return; // Don't move if attacking
    }

    const distanceToPlayer = dx + dy;
    let direction;

    if (distanceToPlayer <= 5) {
      direction =
        Math.abs(dx) > Math.abs(dy)
          ? player.x > enemy.x
            ? "RIGHT"
            : "LEFT"
          : player.y > enemy.y
            ? "DOWN"
            : "UP";
    } else {
      direction = directions[Math.floor(Math.random() * directions.length)];
    }

    gameLevel.moveEnemy(enemy.id, direction);
  });
};

// 🕐 Realtime mode
export const startEnemyAI = () => {
  setInterval(() => {
    const state = store.getState();
    if (state.game.isPaused || state.game.mode !== "realtime") return;

    const gameLevel = rehydrateGameLevel();
    if (!gameLevel) return;

    processEnemyTurn(gameLevel);
    store.dispatch(refreshMap());
  }, 1000);
};

// 🔁 Turn mode
export const runEnemyTurn = () => {
  const gameLevel = rehydrateGameLevel();
  if (!gameLevel) return;

  processEnemyTurn(gameLevel);
  store.dispatch(refreshMap());
};
