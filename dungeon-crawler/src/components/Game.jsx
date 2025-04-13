import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import GameCanvas from "./GameCanvas";
import CharacterCanvas from "./CharacterCanvas";
import PlayerControls from "./PlayerControls";
import GameLoop from "../core/GameLoop";
import { GameWorld } from "../core/GameWorld";
import PlayerStats from "./GameUI";
import MainMenu from "./Menu";
import GameOverOverlay from "./GameOverOverlay.jsx";
import "./Game.css";

const Game = () => {
  const isDead = useSelector((state) => state.player.isDead);



  useEffect(() => {
    GameLoop.start("realtime");
    return () => {
      GameLoop.stop();
    }
  }, []);

  return (
    <div>
      <div className="canvas-container">
        <GameCanvas />
        <CharacterCanvas />
        <PlayerStats />
        {isDead && <GameOverOverlay />}
      </div>
      <PlayerControls />
    </div>
  );
};

export default Game;
