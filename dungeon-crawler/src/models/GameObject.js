class GameObject {
  constructor(id, type, x = null, y = null, sprite = null) {
    this.id = id;
    this.type = type; // "player", "enemy", "item", etc.
    this.x = x;
    this.y = y;

    this.sprite = sprite; // Optional: something with a draw() method
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  canDraw() {
    return this.sprite && this.sprite.isVisible;
  }

  draw(ctx) {
    if (this.canDraw()) {
      this.sprite.draw(ctx, this.x, this.y);
    }
  }
}

export default GameObject;
