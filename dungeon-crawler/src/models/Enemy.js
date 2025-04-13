import Character from "./Character";

class Enemy extends Character {
  constructor(id, x, y, sprite = null) {
    super(id, "enemy", x, y, sprite);
    // Enemy-specific tags or future behaviors can go here
  }
}

export default Enemy;
