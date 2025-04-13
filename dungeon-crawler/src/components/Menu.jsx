// TODO: Implement basic main menu
import React from 'react';

const MainMenu = ({ onStartGame }) => {
  return (
    <div className="main-menu">
      <h1></h1>
      <button className="newgame-button" onClick={onStartGame}></button>
      
    </div>
  );
};

export default MainMenu;