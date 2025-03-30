import { createSlice } from "@reduxjs/toolkit";

const GRID_SIZE = 10; // Define the size of the grid
const SQUARE_SIZE = 50; // Size of each square in pixels

const createInitialState = () => {
  const squares = [];

  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      const isWall =
        x === 0 || x === GRID_SIZE - 1 || y === 0 || y === GRID_SIZE - 1;
      const type = isWall ? "Wall" : "Floor";
      const color = isWall ? "darkgray" : "green"; // Colors for walls and floors

      squares.push({
        x: x * SQUARE_SIZE,
        y: y * SQUARE_SIZE,
        type: type,
        color: color,
        objects: [], // Initialize with no objects
      });
    }
  }

  return squares;
};

const squaresSlice = createSlice({
  name: "squares",
  initialState: createInitialState(), // Use the function to create the initial state
  reducers: {},
});

export const selectSquares = (state) => state.squares;

export default squaresSlice.reducer;
