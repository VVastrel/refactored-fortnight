// Default stats for enemy
const defaults = {
  hitPoints: 100,
  damage: 10,
  // add stats here as needed
};

class Enemy {
  constructor(stats = {}) {
    // Merge stats with defaults, overrides default values if new value is provided
    this.stats = { ...defaults, ...stats };
  }
}
