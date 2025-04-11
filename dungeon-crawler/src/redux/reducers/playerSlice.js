import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playerPosition: { x: 5, y: 5 },
  stats: {
    hp: 10,
    maxHp: 10,
    attack: 2,
    defense: 1,
    experience: 0,
    level: 1,
  },
  isDead: false,
  inventory: [],
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayerPosition(state, action) {
      state.playerPosition = action.payload;
    },
    takeDamage(state, action) {
      const newHp = Math.max(0, state.stats.hp - action.payload);
      state.stats.hp = newHp;

      if (newHp === 0) {
        state.isDead = true;
      }
    },
    healPlayer(state, action) {
      state.stats.hp = Math.min(
        state.stats.maxHp,
        state.stats.hp + action.payload,
      );
    },
    setStats(state, action) {
      state.stats = { ...state.stats, ...action.payload };
    },
    gainExperience(state, action) {
      state.stats.experience += action.payload;
    },
    addItemToInventory(state, action) {
      state.inventory.push(action.payload);
    },
    clearInventory(state) {
      state.inventory = [];
    },
    resetPlayer: () => initialState,
  },
});

export const {
  setPlayerPosition,
  addItemToInventory,
  clearInventory,
  takeDamage,
  healPlayer,
  setStats,
  gainExperience,
  resetPlayer,
} = playerSlice.actions;

export const selectPlayer = (state) => state.player;
export const selectPlayerPosition = (state) => state.player.playerPosition;
export const selectPlayerStats = (state) => state.player.stats;
export const selectInventory = (state) => state.player.inventory;

export default playerSlice.reducer;
