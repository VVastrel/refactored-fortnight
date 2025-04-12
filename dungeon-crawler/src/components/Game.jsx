import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import GameCanvas from "./GameCanvas";
import CharacterCanvas from "./CharacterCanvas";
import PlayerControls from "./PlayerControls";
import { generateMapWithSeed } from "../redux/reducers/mapSlice";
import { resetPlayer } from "../redux/reducers/playerSlice";
import { hydrateWorld } from "../utils/hydrateWorld";
import GameLoop from "../core/GameLoop";
import "./Game.css";

const Game = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Start new game on mount
    dispatch(resetPlayer());
    dispatch(generateMapWithSeed());
    hydrateWorld();
    GameLoop.start("turn"); // or "realtime"

    return () => {
      GameLoop.stop(); // Cleanup on unmount
    };
  }, [dispatch]);

  return (
    <div className="game-container">
      <GameCanvas />
      <CharacterCanvas />
      <PlayerControls />
    </div>
  );
};

export default Game;
