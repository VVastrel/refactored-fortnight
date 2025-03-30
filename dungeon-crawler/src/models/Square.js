import GameObject from "./GameObject.js";

// square class that represents a square on the map
// square can contain other objects like enemies or items.
class Square extends GameObject {
  constructor(id, x, y, type, color) {
    super(id, "Square");
    this.x = x;
    this.y = y;
    this.type = type;
    this.color = color;
    this.objects = [];
  }

  addObject(object) {
    this.objects.push(object);
  }

  removeObject(objectId) {
    // remove object by id
    this.objects = this.objects.filter((obj) => obj.id !== objectId);
  }

  getObjects() {
    return this.objects;
  }
}

export default Square;
