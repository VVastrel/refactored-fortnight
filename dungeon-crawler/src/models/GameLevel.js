import Tile from "./Tile";
import wallSpritePath from "../assets/spr_wll.png";
import { preloadImage } from "../utils/animationUtils";
import Sprite from "./Sprite"; // Assuming sprite lives here

class GameLevel {
  constructor(size, seed = null) {
    this.size = size;
    this.seed = seed;
    this.grid = this.createDefaultLevel();
  }

  createDefaultLevel() {
    const grid = [];
    const wallImage = preloadImage(wallSpritePath);

    for (let y = 0; y < this.size; y++) {
      const row = [];
      for (let x = 0; x < this.size; x++) {
        const isWall =
          x === 0 || x === this.size - 1 || y === 0 || y === this.size - 1;

        const type = isWall ? "wall" : "floor";

        const sprite = new Sprite({
          image: isWall ? wallImage : "#000", // floor fallback is just black
        });

        row.push(new Tile(x, y, type, sprite));
      }
      grid.push(row);
    }

    return grid;
  }

  getTile(x, y) {
    return this.grid?.[y]?.[x] ?? null;
  }

  setTileType(x, y, newType, newSprite = null) {
    const tile = this.getTile(x, y);
    if (!tile) return;

    tile.type = newType;

    if (newSprite) {
      tile.sprite = newSprite;
    }
  }

  addObjectToTile(x, y, gameObject) {
    const tile = this.getTile(x, y);
    if (tile) tile.addGameObject(gameObject);
  }

  removeObjectFromTile(x, y, objectId) {
    const tile = this.getTile(x, y);
    if (tile) tile.removeGameObjectById(objectId);
  }

  moveObject(id, newX, newY) {
    for (const row of this.grid) {
      for (const tile of row) {
        if (tile.hasGameObject(id)) {
          const gameObject = tile.getGameObjects().find((obj) => obj.id === id);
          tile.removeGameObjectById(id);
          const targetTile = this.getTile(newX, newY);
          if (targetTile?.isWalkable()) {
            gameObject.setPosition(newX, newY);
            targetTile.addGameObject(gameObject);
            return true;
          }
        }
      }
    }
    return false;
  }
}

export default GameLevel;
