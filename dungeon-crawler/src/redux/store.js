import { createStore, combineReducers } from "redux";
import playerReducer from "./reducers/playerReducer.js";
import squaresReducer from "./reducers/squaresReducer.js";

const rootReducer = combineReducers({
  player: playerReducer,
  squares: squaresReducer,
  // add new reducers here
});

const store = createStore(rootReducer);

export default store;
