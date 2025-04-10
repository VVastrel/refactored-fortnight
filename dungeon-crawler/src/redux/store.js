import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./reducers/playerSlice";
import mapReducer from "./reducers/mapSlice";

const store = configureStore({
  reducer: {
    player: playerReducer,
    map: mapReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["map.gameLevel"],
      },
    }),
});

export default store;
