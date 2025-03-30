import { createSlice } from "@reduxjs/toolkit";
import Square from "../../models/Square.js";

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

      const square = new Square(
        `${x}-${y}`, // square id, 0-0, 0-1 ...
        x * SQUARE_SIZE,
        y * SQUARE_SIZE,
        type,
        color,
        [], // Initialize with no objects
      );
      squares.push(square);
    }
  }

  return squares;
};

const squaresSlice = createSlice({
  name: "squares",
  initialState: createInitialState(), // Use the function to create the initial state
  reducers: {
    addGameObjectToSquare: (state, action) => {
      const { squareId, gameObject } = action.payload;
      const square = state.find((s) => s.id === squareId);
      if (square) {
        square.addGameObject(gameObject);
      }
    },
  },
});

export const { addGameObjectToSquare } = squaresSlice.actions;

export const selectSquares = (state) => state.squares;

export default squaresSlice.reducer;
