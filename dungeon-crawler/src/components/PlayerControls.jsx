import React from "react";
import { usePlayerMovement } from "../hooks/usePlayerMovement";
import { resetPlayer } from "../redux/reducers/playerSlice";
import { resetMap } from "../redux/reducers/mapSlice";
import { useDispatch, useSelector } from "react-redux";
import KeyPressListener from "./KeyPressListener";

const keyPressToAction = {
  ArrowUp: 'UP',
  ArrowDown: 'DOWN',
  ArrowLeft: 'LEFT',
  ArrowRight: 'RIGHT',
  // add more actions here
};

const PlayerControls= () => {
  const { movePlayer } = usePlayerMovement();
  const dispatch = useDispatch();
  const isDead = useSelector((state) => state.player.isDead);

  const handleKeyPress = (event) => {
    const action = keyPressToAction[event.key];

    if (isDead && event.key.toLowerCase() === "r") {
      dispatch(resetPlayer());
      dispatch(resetMap());
      return;
    }

    if (action && !isDead) {
      movePlayer(action);
    }
  };

  return (
    <>
      <KeyPressListener onKeyPress={handleKeyPress} />
    </>
  );
};

export default PlayerControls;
