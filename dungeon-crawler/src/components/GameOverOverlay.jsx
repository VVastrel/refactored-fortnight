import React from "react";
import "./GameOverOverlay.css";
import deathImage from "../assets/spr_death.png";


const GameOverOverlay = () => {
  return (
    <div className="game-over-overlay">
      <img className="game-over-image" src={deathImage} alt="Game Over Image" />
      <p className="game-over-subtext">Press R to Restart</p>
    </div>
  );
};

export default GameOverOverlay;
