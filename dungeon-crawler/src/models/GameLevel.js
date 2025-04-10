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
}

export default GameLevel;
