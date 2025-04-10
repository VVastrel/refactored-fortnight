import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playerPosition: { x: 5, y: 5 },
  enemies: [],
  inventory: [],
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayerPosition(state, action) {
      state.playerPosition = action.payload;
    },
    addItemToInventory(state, action) {
      state.inventory.push(action.payload);
    },
    addEnemy(state, action) {
      state.enemies.push(action.payload);
    },
    removeEnemy(state, action) {
      state.enemies = state.enemies.filter(
        (enemy) => enemy.id !== action.payload,
      );
    },
    clearInventory(state) {
      state.inventory = [];
    },
  },
});

export const {
  setPlayerPosition,
  addItemToInventory,
  addEnemy,
  removeEnemy,
  clearInventory,
} = playerSlice.actions;

export const selectPlayer = (state) => state.player;
export const selectPlayerPosition = (state) => state.player.playerPosition;
export const selectEnemies = (state) => state.player.enemies;
export const selectInventory = (state) => state.player.inventory;

export default playerSlice.reducer;
