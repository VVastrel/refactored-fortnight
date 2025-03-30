import GameObject from "./GameObject.js";

const defaults = {
  hitPoints: 100,
  damage: 10,
  // add stats here as needed
};

class Enemy extends GameObject {
  constructor(id, name, stats) {
    super(id, name, "Enemy");

    // Merge stats with defaults, overrides default values if new value is provided
    this.stats = { ...defaults, ...stats };
  }
}

export default Enemy;
