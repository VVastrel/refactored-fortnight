import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { logMessage } from "../utils/GameLogger";
import GameCanvas from "./GameCanvas";
import CharacterCanvas from "./CharacterCanvas";
import PlayerControls from "./PlayerControls";
import GameLoop from "../core/GameLoop";
import { GameWorld } from "../core/GameWorld";
import PlayerStats from "./GameUI";
import MainMenu from "./Menu";
import GameOverOverlay from "./GameOverOverlay.jsx";
import GameLogPanel from "./GameLogPanel";
import "./Game.css";

const Game = () => {
  const [showMenu, setShowMenu] = useState(true); 
  const isDead = useSelector((state) => state.player.isDead);

  useEffect(() => {
    if (!showMenu) {
      //GameLoop.start("realtime");
      GameLoop.start("turn");
    }
    if (isDead) {
      GameLoop.stop();
    }
    return () => {
      GameLoop.stop();
    };
  }, [showMenu, isDead]);

  const handleStartGame = () => {
    logMessage("startGame");
    setShowMenu(false); 
  };

  return (
    <div>
      {showMenu ? (
        <MainMenu onStartGame={handleStartGame} /> 
      ) : (
        <div className="game-wrapper">
          <div className="canvas-container">
            <GameCanvas />
            <CharacterCanvas />
            <PlayerStats />
            {isDead && <GameOverOverlay />}
          </div>
            <GameLogPanel />
        </div>
      )}
      {!showMenu && <PlayerControls />}
    </div>
  );
};

export default Game;
