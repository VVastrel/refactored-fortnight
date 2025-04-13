// Here be glorious UI
// Healthbars and stuff like that would be here
import React from "react";
import { useSelector } from "react-redux";
import { selectPlayerStats } from "../redux/reducers/playerSlice";

const PlayerStats = () => {
  const stats = useSelector(selectPlayerStats);

  return (
    <div className="player-stats">
      <p>HP: {stats.hp} / {stats.maxHp}</p>
      <p>Exp: {stats.experience}</p>
      <p>Lvl: {stats.level}</p>
    </div>
  );
};

export default PlayerStats;