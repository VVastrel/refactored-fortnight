import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enemies: [],
};

const enemySlice = createSlice({
  name: "enemies",
  initialState,
  reducers: {
    addEnemy(state, action) {
      state.enemies.push(action.payload);
    },
    removeEnemy(state, action) {
      state.enemies = state.enemies.filter(
        (enemy) => enemy.id !== action.payload,
      );
    },
    damageEnemy(state, action) {
      const { id, damage } = action.payload;
      const enemy = state.enemies.find((e) => e.id === id);
      if (enemy) {
        enemy.hp = Math.max(0, enemy.hp - damage);
      }
    },
    updateEnemy(state, action) {
      const { id, changes } = action.payload;
      const enemy = state.enemies.find((e) => e.id === id);
      if (enemy) {
        Object.assign(enemy, changes);
      }
    },
  },
});

export const { addEnemy, removeEnemy, damageEnemy, updateEnemy } =
  enemySlice.actions;

export const selectEnemies = (state) => state.enemies.enemies;

export default enemySlice.reducer;
