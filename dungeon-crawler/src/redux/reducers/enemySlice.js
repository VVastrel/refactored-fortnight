import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enemies: [
    {
      id: "enemy-001",
      type: "enemy",
      x: 8,
      y: 8,
      stats: {
        hp: 5,
        maxHp: 5,
        attack: 1,
        defense: 0,
      },
    },
  ],
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
      if (enemy && enemy.stats) {
        enemy.stats.hp = Math.max(0, enemy.stats.hp - damage);
      }
    },
    moveEnemy(state, action) {
      const { id, x, y } = action.payload;
      const enemy = state.enemies.find((e) => e.id === id);
      if (enemy) {
        enemy.x = x;
        enemy.y = y;
      }
    },
    setEnemyStats(state, action) {
      const { id, stats } = action.payload;
      const enemy = state.enemies.find((e) => e.id === id);
      if (enemy) {
        enemy.stats = { ...enemy.stats, ...stats };
      }
    },
    resetEnemies: () => initialState,
  },
});

export const {
  addEnemy,
  removeEnemy,
  damageEnemy,
  moveEnemy,
  setEnemyStats,
  resetEnemies,
} = enemySlice.actions;

export const selectEnemies = (state) => state.enemies.enemies;
export const selectEnemyById = (id) => (state) =>
  state.enemies.enemies.find((e) => e.id === id);

export default enemySlice.reducer;
