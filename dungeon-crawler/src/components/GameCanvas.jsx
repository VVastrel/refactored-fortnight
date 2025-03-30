import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectSquares } from '../redux/reducers/squaresReducer';

// TODO: Draw objects inside squares

const GameCanvas = () => {
  const canvasRef = useRef(null);
  const squares = useSelector(selectSquares); // get squares from redux store

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;

    // Clear the canvas before drawing
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw each square based on its properties
    squares.forEach(square => {
      context.fillStyle = square.color; // Set the square color
      context.fillRect(square.x, square.y, 50, 50); // Draw the square
      context.strokeStyle = 'black'; // Set the border color
      context.strokeRect(square.x, square.y, 50, 50); // Draw the border

      // this is just for debugging to show what is on each square
      // set text properties
      context.fillStyle = 'black';
      context.font = '12px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';

      // draw text to indicate square type
      context.fillText(square.type, square.x + 25, square.y + 25);
    });
  }, [squares]); // Redraw when squares are updated

  return (
    <canvas
      ref={canvasRef}
      style={{ border: '1px solid black' }}
    />
  );
};

export default GameCanvas;
