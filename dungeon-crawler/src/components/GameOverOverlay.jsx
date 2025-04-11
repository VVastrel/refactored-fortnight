import React from "react";
import "./GameOverOverlay.css";

const GameOverOverlay = () => {
  return (
    <div className="game-over-overlay">
      <h1 className="game-over-title">You Died</h1>
      <p className="game-over-subtext">Press R to Restart</p>
    </div>
  );
};

export default GameOverOverlay;
