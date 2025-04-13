import { createSlice } from "@reduxjs/toolkit";
import { GRID_SIZE } from "../../config/constants";

const createEmptyGrid = (size) =>
  Array.from({ length: size }, (_, y) =>
    Array.from({ length: size }, (_, x) => {
      const isWall = x === 0 || x === size - 1 || y === 0 || y === size - 1;

      return {
        x,
        y,
        type: isWall ? "wall" : "floor",
        gameObjectIds: [],
      };
    }),
  );

const initialState = {
  seed: null,
  gridSize: GRID_SIZE,
  grid: createEmptyGrid(GRID_SIZE),
  isReady: false,
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
    setGrid: (state, action) => {
      const { grid } = action.payload;
      state.grid = grid;
    },

    resetMap: () => initialState,

    setMapReady: (state, action) => {
      const { isReady } = action.payload;
      state.isReady = isReady;
    },
  },
});

export const {
  generateMapWithSeed,
  setTileType,
  addGameObjectToTile,
  removeGameObjectFromTile,
  resetMap,
  setMapReady,
  setGrid,
} = mapSlice.actions;

export const selectMap = (state) => state.map;
export const selectMapSeed = (state) => state.map.seed;
export const selectGrid = (state) => state.map.grid;
export const selectGridSize = (state) => state.map.gridSize;
export const selectMapReady = (state) => state.map.isReady;

export default mapSlice.reducer;
