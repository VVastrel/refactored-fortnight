import { SET_PLAYER_POSITION } from "../actions/playerActions.js";

const initialState = { playerPosition: { x: 0, y: 0 } };

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYER_POSITION:
      return { ...state, playerPosition: action.payload };
    default:
      return state;
  }
};

export default playerReducer;
