// player actions here
// TODO: Add actions for setting different stats

export const SET_PLAYER_POSITION = "SET_PLAYER_POSITION";

export const setPlayerPosition = (newPosition) => ({
  type: SET_PLAYER_POSITION,
  payload: newPosition,
});
