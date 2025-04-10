import Character from "./Character.js";

class Enemy extends Character {
  constructor(id, x, y, sprite) {
    super(id, "enemy", x, y, sprite, 32, 32, 2); // width, height, frames
  }
}

export default Enemy;
