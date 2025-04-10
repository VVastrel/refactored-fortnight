import GameObject from "./GameObject.js";

class Tile {
  constructor(id, x, y, type = "floor") {
    this.id = id;
    this.x = x;
    this.y = y;
    this.type = type; // "floor", "wall", etc.
    this.contents = []; // GameObjects like items, enemies, player
  }

  isWalkable() {
    return this.type === "floor";
  }

  addGameObject(gameObject) {
    if (gameObject instanceof GameObject) {
      gameObject.setPosition(this.x, this.y); // Ensure it knows its location
      this.contents.push(gameObject);
    } else {
      console.warn("Only GameObjects can be added to a tile");
    }
  }

  removeGameObjectById(id) {
    this.contents = this.contents.filter((obj) => obj.id !== id);
  }

  getGameObjects() {
    return this.contents;
  }

  hasType(type) {
    return this.contents.some((obj) => obj.type === type);
  }

  getFirstObjectOfType(type) {
    return this.contents.find((obj) => obj.type === type);
  }
}

export default Tile;
