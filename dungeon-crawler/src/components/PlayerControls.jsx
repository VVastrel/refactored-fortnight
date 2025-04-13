import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePlayerMovement } from "../hooks/usePlayerMovement";
import { resetPlayer } from "../redux/reducers/playerSlice";
import { resetMap } from "../redux/reducers/mapSlice";
import KeyPressListener from "./KeyPressListener";

const keyPressToAction = {
  ArrowUp: "UP",
  ArrowDown: "DOWN",
  ArrowLeft: "LEFT",
  ArrowRight: "RIGHT",
  // Add more bindings as needed
};

const PlayerControls = () => {
  const dispatch = useDispatch();
  const { movePlayer } = usePlayerMovement();
  const isDead = useSelector((state) => state.player.isDead);

  const onKeyPress = useCallback((event) => {
    const key = event.key.toLowerCase();

    if (isDead && key === "r") {
      dispatch(resetPlayer());
      dispatch(resetMap());
      return;
    }

    const action = keyPressToAction[event.key];
    if (action && !isDead) {
      movePlayer(action);
    }
  }, [dispatch, isDead, movePlayer]);

  return <KeyPressListener onKeyPress={onKeyPress} />;
};

export default PlayerControls;
