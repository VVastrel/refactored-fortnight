import Character from "./Character.js";

class Enemy extends Character {
  constructor(id, x, y, sprite, customStats = {}) {
    super(id, "enemy", x, y, sprite, 32, 32, 2); // width, height, frames
    this.stats = {
      hp: 10,
      maxHp: 10,
      attack: 2,
      defense: 1,
      level: 1,
      ...customStats,
    };
  }
}

export default Enemy;
