import Tile from "../models/Tile";
import GameLevel from "../models/GameLevel";

export const createMockGameLevel = () => {
  const size = 10;
  const level = new GameLevel(size);

  // Fill the grid with floor tiles
  level.grid = Array.from({ length: size }, (_, y) =>
    Array.from({ length: size }, (_, x) => {
      const tile = new Tile(x, y);
      tile.type = "floor";

      // Add some walls
      if (x === 0 || y === 0 || x === size - 1 || y === size - 1) {
        tile.type = "wall";
      }

      return tile;
    }),
  );

  return level;
};
