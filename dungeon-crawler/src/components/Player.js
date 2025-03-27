// Starting stats for player
const defaults = {
  hitPoints: 100,
  experience: 0,
  level: 1,
  // add stats here as needed
};

class Player {
  constructor(stats = {}) {
    // Merge stats with defaults, overrides default values if new value is provided
    this.stats = { ...defaults, ...stats };
  }
}
