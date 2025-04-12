class GameWorld {
  constructor() {
    this.objects = new Map();
    this.grid = []; // add this line if not already present
  }

  setGrid(grid) {
    this.grid = grid;
  }

  getGrid() {
    return this.grid;
  }

  reset() {
    this.objects.clear();
  }

  addObject(object) {
    if (!object?.id) throw new Error("GameObject must have an `id`.");
    if (this.objects.has(object.id)) {
      console.warn(`GameObject with id ${object.id} already exists.`);
    }
    this.objects.set(object.id, object);
  }

  updateObject(id, changes) {
    const obj = this.objects.get(id);
    if (obj) {
      Object.assign(obj, changes);
    }
  }
  removeObject(id) {
    this.objects.delete(id);
  }

  getObject(id) {
    return this.objects.get(id);
  }

  getObjectsByType(type) {
    return [...this.objects.values()].filter((obj) => obj.type === type);
  }

  getAll() {
    return [...this.objects.values()];
  }

  forEach(callback) {
    for (const obj of this.objects.values()) {
      callback(obj);
    }
  }

  getObjectsAt(x, y) {
    return [...this.objects.values()].filter(
      (obj) => obj.x === x && obj.y === y,
    );
  }

  hasObject(id) {
    return this.objects.has(id);
  }
}

// Singleton instance
const instance = new GameWorld();
export { instance as GameWorld };
