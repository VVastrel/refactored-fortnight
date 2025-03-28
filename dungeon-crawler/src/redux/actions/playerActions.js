// player actions here
// move, attack, use items

export const SET_PLAYER_POSITION = "SET_PLAYER_POSITION";

export const setPlayerPosition = (newPosition) => ({
  type: SET_PLAYER_POSITION,
  payload: newPosition,
});
