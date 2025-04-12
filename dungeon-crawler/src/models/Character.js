import GameObject from "./GameObject.js";

class Character extends GameObject {
  constructor(id, type, x, y, sprite) {
    super(id, type, x, y, sprite);
    this.direction = "RIGHT";
    this.stats = null;
  }

  applyStats(stats) {
    this.stats = { ...stats };
  }

  isAlive() {
    return this.stats?.hp > 0;
  }

  getAttackPower() {
    return this.stats?.attack ?? 0;
  }

  getDefense() {
    return this.stats?.defense ?? 0;
  }

  update() {
    // optional extension (e.g., AI, regen, animations)
  }
}
export default Character;
