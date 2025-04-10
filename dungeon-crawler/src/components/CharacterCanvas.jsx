import React, { useRef, useEffect } from 'react';
import { preloadImage, getCurrentFrameX } from '../utils/animationUtils.js';
import { useAnimation } from '../hooks/useAnimation.js';

const ObjectCanvas = ({ objects }) => {
  const canvasRef = useRef(null);
  const canvasSize = 600;
  const squareSize = 30;

  
  const frameIndex = useAnimation(objects[0]?.totalFrames || 1, 200);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    context.imageSmoothingEnabled = false;

    let animationFrameId;

    const draw = () => {
      context.clearRect(0, 0, canvasSize, canvasSize);

      objects.forEach((obj) => {
        const { x, y, size, image, frameWidth, frameHeight, direction } = obj;

        const img = preloadImage(image);
        const currentFrameX = getCurrentFrameX(frameIndex, frameWidth);

        context.save();

        if (direction === 'LEFT') {
          context.scale(-1, 1);
          context.drawImage(
            img,
            currentFrameX, 0,
            frameWidth, frameHeight,
            -(x * squareSize + size), y * squareSize,
            size, size
          );
        } else {
          context.drawImage(
            img,
            currentFrameX, 0,
            frameWidth, frameHeight,
            x * squareSize, y * squareSize,
            size, size
          );
        }

        context.restore();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(animationFrameId);
  }, [objects, frameIndex]); 

  return <canvas id="CharacterCanvas" ref={canvasRef}></canvas>;
};

export default ObjectCanvas;