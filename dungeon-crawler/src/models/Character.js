import GameObject from "./GameObject.js";

const defaults = {
  hitPoints: 100,
  damage: 10,
  // add stats here as needed
};

class Character extends GameObject {
  constructor(id, name, type, stats) {
    super(id, name, "Character");

    // Merge stats with defaults, overrides default values if new value is provided
    this.stats = { ...defaults, ...stats };
  }
}

export default Character;
