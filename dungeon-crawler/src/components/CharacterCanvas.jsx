import React, { useRef, useEffect } from 'react';

const ObjectCanvas = ({ objects }) => {
  const canvasRef = useRef(null);
  const canvasSize = 600;
  const squareSize = 30;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    context.clearRect(0, 0, canvasSize, canvasSize);

    // Draw characters on the canvas
    objects.forEach(obj => {
      const { x, y, color, size } = obj;
      context.fillStyle = color;
      context.fillRect(x * squareSize, y * squareSize, size, size);
    });
  }, [objects]);

  return <canvas id="CharacterCanvas" ref={canvasRef}></canvas>;
};

export default ObjectCanvas;
