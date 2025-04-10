import { createSlice } from "@reduxjs/toolkit";
import GameLevel from "../../models/GameLevel.js";

const GRID_SIZE = 20;

const initialState = {
  seed: null, // future-proof
  gameLevel: new GameLevel(GRID_SIZE),
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    generateMapWithSeed: (state, action) => {
      const seed = action.payload || Math.random().toString(36).slice(2);
      state.seed = seed;
      state.gameLevel = new GameLevel(GRID_SIZE, seed); // <- pass seed to constructor in the future
    },
    setTileType: (state, action) => {
      const { x, y, newType } = action.payload;
      state.gameLevel.setTileType(x, y, newType);
    },
    addGameObjectToTile: (state, action) => {
      const { x, y, gameObject } = action.payload;
      state.gameLevel.addObjectToTile(x, y, gameObject);
    },
    removeGameObjectFromTile: (state, action) => {
      const { x, y, gameObjectId } = action.payload;
      const tile = state.gameLevel.getTile(x, y);
      if (tile) {
        tile.removeGameObjectById(gameObjectId);
      }
    },
  },
});

export const {
  generateMapWithSeed,
  setTileType,
  addGameObjectToTile,
  removeGameObjectFromTile,
} = mapSlice.actions;

export const selectGameLevel = (state) => state.map.gameLevel;
export const selectMapSeed = (state) => state.map.seed;

export default mapSlice.reducer;
