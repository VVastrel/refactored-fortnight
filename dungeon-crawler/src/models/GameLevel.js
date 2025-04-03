// Grid to represent the map.
class GameLevel {
  constructor(size) {
    this.size = size;
    this.grid = this.createDefaultLevel();
  }

  createDefaultLevel() {
    const grid = [];

    for (let i = 0; i < this.size; i++) {
      const row = [];
      for (let j = 0; j < this.size; j++) {
        // Change 'i++' to 'j++'
        if (i === 0 || i === this.size - 1 || j === 0 || j === this.size - 1) {
          row.push(0);
        } else {
          row.push(1);
        }
      }
      grid.push(row);
    }

    return grid;
  }

  getLocation(x, y) {
    return this.grid[y][x]; // Return the value at the specified location
  }

  createNewLevel() {
    console.log("Generating new level...");
  }
}

export default GameLevel;
