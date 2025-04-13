import React, { useEffect } from "react";
import GameCanvas from "./GameCanvas";
import CharacterCanvas from "./CharacterCanvas";
import PlayerControls from "./PlayerControls";
import GameLoop from "../core/GameLoop";
import "./Game.css";
import { GameWorld } from "../core/GameWorld";

const Game = () => {
  if (import.meta.env.DEV) {
    window.GameWorld = GameWorld;
    window.GameLoop = GameLoop;
  }
  useEffect(() => {
    GameLoop.start("turn");
    return () => {
      GameLoop.stop();
    }
  }, []);

  return (
    <div>
      <div className="canvas-container">
        <GameCanvas />
        <CharacterCanvas />
      </div>
      <PlayerControls />
    </div>
  );
};

export default Game;
