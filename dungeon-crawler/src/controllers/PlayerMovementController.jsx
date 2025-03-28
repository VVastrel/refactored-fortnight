// Player movement here
import React, { useEffect } from "react";

const handleKeyDown = (event) => {
  let newPosition = { x: 0, y: 0 };

  switch (event.key) {
    case "arrowUp":
      newPosition = { x: 0, y: -1 };
      break;
    case "arrowDown":
      newPosition = { x: 0, y: 1 };
      break;
    case "arrowLeft":
      newPosition = { x: -1, y: 0 };
      break;
    case "arrowRight":
      newPosition = { x: 1, y: 0 };
      break;
    default:
      return;
  };

  const MovementController = ({ updatePlayerPosition }) => {
    const success = updatePlayerPosition(newPosition);
    console.log(success ? "Move successful" : "Move failed");

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
};

export default MovementController;
