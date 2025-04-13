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
        const isWall =
          x === 0 || x === this.size - 1 || y === 0 || y === this.size - 1;

        const type = isWall ? "wall" : "floor";

        row.push({ x, y, type, gameObjectIds: [] });
      }
      grid.push(row);
    }

    return grid;
  }

  getTile(x, y) {
    return this.grid?.[y]?.[x] ?? null;
  }

  setTileType(x, y, newType) {
    const tile = this.getTile(x, y);
    if (!tile) return;
    tile.type = newType;
  }

  addObjectToTile(x, y, objectId) {
    const tile = this.getTile(x, y);
    if (
      tile?.type === "floor" &&
      !tile.gameObjectIds.find((obj) => obj.id === objectId)
    ) {
      tile.gameObjectIds.push(objectId);
    }
  }

  removeObjectFromTile(x, y, objectId) {
    const tile = this.getTile(x, y);
    if (tile) {
      tile.gameObjectIds = tile.gameObjectIds.filter(
        (obj) => obj.id !== objectId,
      );
    }
  }

  moveObject(id, newX, newY) {
    for (const row of this.grid) {
      for (const tile of row) {
        if (tile.gameObjectIds.find((obj) => obj.id === id)) {
          if (this.getTile(newX, newY)?.type === "floor") {
            this.addObjectToTile(newX, newY, id);
            this.removeObjectFromTile(tile.x, tile.y, id);
            return true;
          }
        }
      }
    }
    return false;
  }

  getGrid() {
    return this.grid;
  }
}

export default GameLevel;
