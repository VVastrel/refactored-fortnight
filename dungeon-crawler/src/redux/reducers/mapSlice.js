import { createSlice } from "@reduxjs/toolkit";
import GameLevel from "../../models/GameLevel.js";
import Enemy from "../../models/Enemy.js";
import enemySprite from "../../assets/spr_skl_1.png";

const GRID_SIZE = 20;
const gameLevel = new GameLevel(GRID_SIZE);

// Add a test enemy to position (10, 10)
const testEnemy = new Enemy("enemy-001", 10, 10, enemySprite);
gameLevel.addObjectToTile(testEnemy.x, testEnemy.y, testEnemy);

const initialState = {
  seed: null, // future-proof
  gameLevel: gameLevel,
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
    refreshMap: (state) => {
      return {
        ...state,
        gameLevel: { ...state.gameLevel }, // trigger new ferefence
      };
    },
    resetMap: () => initialState,
  },
});

export const {
  generateMapWithSeed,
  setTileType,
  addGameObjectToTile,
  removeGameObjectFromTile,
  refreshMap,
  resetMap,
} = mapSlice.actions;

export const selectGameLevel = (state) => state.map.gameLevel;

export const selectMapSeed = (state) => state.map.seed;

export default mapSlice.reducer;
