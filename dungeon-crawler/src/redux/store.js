import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./reducers/playerSlice";
import mapReducer from "./reducers/mapSlice";
import gameReducer from "./reducers/gameSlice.js";
import enemyReducer from "./reducers/enemySlice.js";
import logReducer from "./reducers/logSlice";

const store = configureStore({
  reducer: {
    player: playerReducer,
    map: mapReducer,
    game: gameReducer,
    enemies: enemyReducer,
    log: logReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["map.gameLevel"],
      },
    }),
});

export default store;
