import { createSlice } from "@reduxjs/toolkit";

const GRID_SIZE = 20;

// Create a blank grid of tile metadata
const createEmptyGrid = (size) =>
  Array.from({ length: size }, (_, y) =>
    Array.from({ length: size }, (_, x) => ({
      x,
      y,
      type: "floor", // or "wall"
      gameObjectIds: [], // only store IDs here
    })),
  );

const initialState = {
  seed: null,
  gridSize: GRID_SIZE,
  grid: createEmptyGrid(GRID_SIZE),
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    generateMapWithSeed: (state, action) => {
      const seed = action.payload || Math.random().toString(36).slice(2);
      state.seed = seed;
      state.gridSize = GRID_SIZE;
      state.grid = createEmptyGrid(GRID_SIZE);
    },

    setTileType: (state, action) => {
      const { x, y, newType } = action.payload;
      const tile = state.grid[y]?.[x];
      if (tile) {
        tile.type = newType;
      }
    },

    addGameObjectToTile: (state, action) => {
      const { x, y, gameObjectId } = action.payload;
      const tile = state.grid[y]?.[x];
      if (tile && !tile.gameObjectIds.includes(gameObjectId)) {
        tile.gameObjectIds.push(gameObjectId);
      }
    },

    removeGameObjectFromTile: (state, action) => {
      const { x, y, gameObjectId } = action.payload;
      const tile = state.grid[y]?.[x];
      if (tile) {
        tile.gameObjectIds = tile.gameObjectIds.filter(
          (id) => id !== gameObjectId,
        );
      }
    },

    resetMap: () => initialState,
  },
});

export const {
  generateMapWithSeed,
  setTileType,
  addGameObjectToTile,
  removeGameObjectFromTile,
  resetMap,
} = mapSlice.actions;

export const selectMap = (state) => state.map;
export const selectMapSeed = (state) => state.map.seed;
export const selectGrid = (state) => state.map.grid;
export const selectGridSize = (state) => state.map.gridSize;

export default mapSlice.reducer;
