// Here be glorious UI
// Healthbars and stuff like that would be here
import React from "react";
import { useSelector } from "react-redux";
import { selectPlayerStats } from "../redux/reducers/playerSlice";
import { selectDungeonLevel } from "../redux/reducers/mapSlice";

const PlayerStats = () => {
  const stats = useSelector(selectPlayerStats);
  const dungeonLevel = useSelector(selectDungeonLevel);

  return (
    <div className="player-stats">
      <div className="stats-content">
        <p>HP: {stats.hp} / {stats.maxHp}</p>
        <p>Att: {stats.attack}</p>
        <p>Def: {stats.defense}</p>
        <p>Exp: {stats.experience}</p>
        <p>Exp required: {stats.experienceToNextLevel}</p>
        <p>Lvl: {stats.level}</p>
        <p>Dungeon lvl: {dungeonLevel}</p>
      </div>
    </div>
  );
};

export default PlayerStats;
