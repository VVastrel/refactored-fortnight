import GameObject from "./GameObject.js";

// square class that represents a square on the map
// square can contain  GameObjects like enemies or items.
class Square extends GameObject {
  constructor(id, x, y, type, color) {
    super(id, "Square");
    this.x = x;
    this.y = y;
    this.type = type;
    this.color = color;
    this.gameObjects = [];
  }

  addGameObject(gameObject) {
    if (gameObject instanceof GameObject) {
      this.gameObjects.push(gameObject);
    } else {
      console.log("Only GameObjects can be added to a square");
    }
  }

  removeGameObject(objectId) {
    // remove object by id
    this.gameObjects = this.gameObjects.filter((obj) => obj.id !== objectId);
  }

  getGameObjects() {
    return this.gameObjects;
  }
}

export default Square;
