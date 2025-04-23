import { createSlice } from "@reduxjs/toolkit";
import { MAX_LOG_LENGTH } from "../../config/constants";

const logSlice = createSlice({
  name: "log",
  initialState: [],
  reducers: {
    addLog(state, action) {
      if (state.length >= MAX_LOG_LENGTH) {
        state.shift(); // remove oldest
      }
      state.push({ message: action.payload, timestamp: Date.now() });
    },
    clearLog() {
      return [];
    },
  },
});

export const { addLog, clearLog } = logSlice.actions;
export default logSlice.reducer;
