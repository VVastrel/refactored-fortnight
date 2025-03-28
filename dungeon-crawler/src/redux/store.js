import { createStore, combineReducers } from "redux";
import { playerReducer } from "./reducers/playerReducer.js";

const rootReducer = combineReducers({
  player: playerReducer,
  // add new reducers here
});

const store = createStore(rootReducer);

export default store;
