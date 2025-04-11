// TODO: Implement basic main menu
import React from 'react';

const MainMenu = ({ onStartGame }) => {
  return (
    <div className="main-menu">
      <h1>Palace of the Holder</h1>
      <button onClick={onStartGame}>Start Game</button>
    </div>
  );
};

export default MainMenu;