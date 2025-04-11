import Character from "./Character.js";

class Player extends Character {
  constructor(id, x, y, sprite) {
    super(id, "player", x, y, sprite, 32, 32, 2);
    this.stats = {
      hp: 10,
      maxHp: 10,
      attack: 2,
      defence: 1,
      level: 1,
      experience: 0,
    };
  }
}

export default Player;
