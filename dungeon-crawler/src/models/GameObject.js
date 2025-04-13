import { TILE_SIZE } from "../config/constants";

class GameObject {
  constructor(id, type, x = null, y = null, sprite = null) {
    this.id = id;
    this.type = type; // "player", "enemy", "item", etc.
    this.x = x;
    this.y = y;
    this.sprite = sprite;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  canDraw() {
    return !!this.sprite?.isVisible;
  }

  draw(ctx, frameIndex = 0) {
    if (this.canDraw()) {
      this.sprite.draw(ctx, this.x, this.y, TILE_SIZE, frameIndex);
    }
  }
}
export default GameObject;
