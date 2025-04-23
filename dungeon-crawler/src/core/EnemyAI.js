import { GameWorld } from "./GameWorld";
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
      //console.log(`${enemy.id} attacks the player!`);
      performAttack(enemy, player);
      return; // dont move if attacking
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

    tryMoveEnemy(enemy, direction);
  });
};

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

  // check tile type before moving
  const tile = GameWorld.getTile(newX, newY);
  if (!tile || tile.type !== "floor") return;

  // don't move onto another character
  const blocking = tile
    .getGameObjects()
    .some((obj) => obj.type === "enemy" || obj.type === "player");
  if (blocking) {
    return;
  }

  // remove enemy from old tile
  const oldTile = GameWorld.getTile(enemy.x, enemy.y);
  oldTile.removeGameObjectById(enemy.id);
  // add enemy to new tile
  tile.addGameObject(enemy);

  // flip enemy sprite to match the direcion of movement
  enemy.sprite.setDirection(direction);

  // update enemy position
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
