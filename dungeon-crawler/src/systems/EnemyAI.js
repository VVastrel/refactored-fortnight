import { GameWorld } from "../core/GameWorld";
import { performAttack } from "../utils/combatUtils";
import store from "../redux/store";

const directions = ["UP", "DOWN", "LEFT", "RIGHT"];

export const processEnemyTurn = () => {
  const player = GameWorld.getObject("player");
  if (!player) return;

  const enemies = GameWorld.getObjectsByType("enemy");

  enemies.forEach((enemy) => {
    const dx = Math.abs(enemy.x - player.x);
    const dy = Math.abs(enemy.y - player.y);
    const isAdjacent = dx + dy === 1;

    if (isAdjacent) {
      console.log(`${enemy.id} attacks the player!`);
      performAttack(enemy, player);
      return; // Don't move if attacking
    }

    let direction;
    const distanceToPlayer = dx + dy;

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

    // Try to move enemy (logic could eventually check tile blocking, etc.)
    tryMoveEnemy(enemy, direction);
  });
};

// Movement helper (safe logic layer between enemy and GameWorld)
function tryMoveEnemy(enemy, direction) {
  const dirMap = {
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 },
  };

  const delta = dirMap[direction];
  const newX = enemy.x + delta.x;
  const newY = enemy.y + delta.y;

  // Optional: check tile type before moving
  const tile = GameWorld.getTile(newX, newY);
  if (!tile || tile.type === "wall") return;

  // Optional: don't move onto another character
  const blocking = tile
    .getGameObjects()
    .some((obj) => obj.type === "enemy" || obj.type === "player");
  if (blocking) return;

  enemy.setPosition(newX, newY);
}

// Real-time AI loop
export const startEnemyAI = () => {
  setInterval(() => {
    const state = store.getState();
    if (state.game.isPaused || state.game.mode !== "realtime") return;

    processEnemyTurn();
  }, 1000);
};

// Turn-based AI
export const runEnemyTurn = () => {
  processEnemyTurn();
};
