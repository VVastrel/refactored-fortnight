import React, { useRef, useEffect } from 'react';

const fillColors = ['gray', 'green'];
const strokeColors = ['black', 'darkgreen'];

const GameCanvas = ({gameLevel}) => {
  const canvasRef = useRef(null);
  const canvasSize = 600;
  const numberOfSquares = 20;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    canvas.width = canvasSize;
    canvas.height = canvasSize;

    // Calculate the square size based on the canvas size
    const squareSize = canvasSize / numberOfSquares;

    // Draw squares
    for (let x = 0; x < numberOfSquares; x++) {
      for (let y = 0; y < numberOfSquares; y ++) {
        context.fillStyle = fillColors[gameLevel.getLocation(x,y)];
        context.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
        context.strokeStyle = strokeColors[gameLevel.getLocation(x,y)];
        context.strokeRect(x * squareSize, y * squareSize, squareSize, squareSize);
      }
    }
  }, [gameLevel]);

  return <canvas id="GameCanvas" ref={canvasRef}></canvas>;
};

export default GameCanvas;
