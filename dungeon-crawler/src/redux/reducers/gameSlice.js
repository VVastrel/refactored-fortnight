import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    mode: "realtime",
    isPaused: false,
    saveSlot: null,
  },
  reducers: {
    setGameMode: (state, action) => {
      state.mode = action.payload;
    },
    setPaused: (state, action) => {
      state.isPaused = action.payload;
    },
  },
});

export const { setGameMode, setPaused } = gameSlice.actions;
export const selectGameMode = (state) => state.game.mode;
export const selectIsPaused = (state) => state.game.isPaused;

export default gameSlice.reducer;
