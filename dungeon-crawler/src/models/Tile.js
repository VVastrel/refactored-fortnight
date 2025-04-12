import GameObject from "./GameObject.js";

class Tile extends GameObject {
  constructor(x, y, type = "floor", sprite = null) {
    // Use "tile-x-y" as the ID to keep it unique
    const id = `tile-${x}-${y}`;
    super(id, "tile", x, y, sprite);

    this.type = type;
    this.gameObjects = []; // objects on this tile (player, enemies, items)
  }

  addGameObject(gameObject) {
    if (!this.gameObjects.find((obj) => obj.id === gameObject.id)) {
      this.gameObjects.push(gameObject);
    }
  }

  removeGameObjectById(id) {
    this.gameObjects = this.gameObjects.filter((obj) => obj.id !== id);
  }

  hasGameObject(id) {
    return this.gameObjects.some((obj) => obj.id === id);
  }

  getGameObjects() {
    return this.gameObjects;
  }

  getFirstObjectOfType(type) {
    return this.gameObjects.find((obj) => obj.type === type);
  }

  isWalkable() {
    return this.type === "floor";
  }

  draw(ctx, frameIndex = 0) {
    // Draw the tile itself
    super.draw(ctx, frameIndex);

    // Optionally: draw the objects on top (for debug or visual layering)
    for (const obj of this.gameObjects) {
      if (obj.canDraw()) {
        obj.draw(ctx, frameIndex);
      }
    }
  }
}

export default Tile;
