import store from "../redux/store.js";
import { refreshMap } from "../redux/reducers/mapSlice.js";
import Tile from "./Tile.js";

class GameLevel {
  constructor(size, seed = null) {
    this.size = size;
    this.seed = seed;
    this.grid = this.createDefaultLevel();
  }

  createDefaultLevel() {
    const grid = [];

    for (let y = 0; y < this.size; y++) {
      const row = [];
      for (let x = 0; x < this.size; x++) {
        const type =
          x === 0 || x === this.size - 1 || y === 0 || y === this.size - 1
            ? "wall"
            : "floor";
        row.push(new Tile(`${x}-${y}`, x, y, type));
      }
      grid.push(row);
    }

    return grid;
  }

  getTile(x, y) {
    return this.grid[y]?.[x];
  }

  setTileType(x, y, newType) {
    const tile = this.getTile(x, y);
    if (tile) tile.type = newType;
  }

  addObjectToTile(x, y, gameObject) {
    const tile = this.getTile(x, y);
    if (tile) tile.addGameObject(gameObject);
  }

  createNewLevel() {
    console.log("Generating new level with seed:", this.seed);
    // Future: use seed to generate procedurally
  }

  moveEnemy(id, direction) {
    for (let row of this.grid) {
      for (let tile of row) {
        const enemy = tile.getGameObjects().find((obj) => obj.id === id);
        if (enemy) {
          const newX =
            direction === "LEFT"
              ? enemy.x - 1
              : direction === "RIGHT"
                ? enemy.x + 1
                : enemy.x;
          const newY =
            direction === "UP"
              ? enemy.y - 1
              : direction === "DOWN"
                ? enemy.y + 1
                : enemy.y;

          const targetTile = this.getTile(newX, newY);
          if (!targetTile || targetTile.type === "wall") return false;

          tile.removeGameObjectById(enemy.id);
          enemy.x = newX;
          enemy.y = newY;
          targetTile.addGameObject(enemy);
          store.dispatch(refreshMap());
          return true;
        }
      }
    }
    return false;
  }
}

export default GameLevel;
