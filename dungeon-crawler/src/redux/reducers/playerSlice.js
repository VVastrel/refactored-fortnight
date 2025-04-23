import { createSlice } from "@reduxjs/toolkit";

function getTotalXpForLevel(level) {
  return 10 + Math.floor(level ** 1.5 * 5);
}

const initialState = {
  id: "player",
  playerPosition: { x: 5, y: 5 },
  stats: {
    hp: 10,
    maxHp: 10,
    attack: 2,
    defense: 1,
    experience: 0,
    experienceToNextLevel: 10,
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

      let requiredXP = getTotalXpForLevel(state.stats.level + 1);

      while (state.stats.experience >= requiredXP) {
        state.stats.level += 1;
        state.stats.maxHp += 5;
        state.stats.hp = state.stats.maxHp;
        state.stats.attack += 1;

        // incerease defense for every 3 levels
        if (state.stats.level % 3 == 0) {
          state.stats.defense += 1;
        }

        requiredXP = getTotalXpForLevel(state.stats.level + 1);
        console.log(`Level up! You have reached level ${state.stats.level}!`);
      }
      state.stats.experienceToNextLevel = requiredXP;
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
export const selectPlayerId = (state) => state.player.id;
export const selectPlayerDataById = (id) => (state) =>
  id === state.player.id
    ? {
        id: state.player.id,
        x: state.player.playerPosition.x,
        y: state.player.playerPosition.y,
        stats: state.player.stats,
        isDead: state.player.isDead,
      }
    : null;

export default playerSlice.reducer;
