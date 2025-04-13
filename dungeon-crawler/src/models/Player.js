import Character from "./Character";

class Player extends Character {
  constructor(id, x, y, sprite = null) {
    super(id, "player", x, y, sprite);
    // Additional properties specific to player can be added here later
  }
}

export default Player;
