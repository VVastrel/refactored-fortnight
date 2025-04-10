import React, { useRef, useEffect, useMemo } from 'react';
import { useSelector } from "react-redux";
import { selectPlayerPosition  } from "../redux/reducers/playerSlice";
import { preloadImage, getCurrentFrameX } from '../utils/animationUtils.js';
import { useAnimation } from '../hooks/useAnimation.js';
import playerSprite from '../assets/spriteSheet.png';
import enemySprite from '../assets/spr_skl_1.png';

const CharacterCanvas = () => {
  const canvasRef = useRef(null);
  const tileSize = 30;
  const canvasSize = 20 * tileSize;

  const playerPosition = useSelector(selectPlayerPosition);
  const gameLevel = useSelector((state) => state.map.gameLevel);
  //const enemies = useSelector(selectEnemies);

  // Animation frame index
  const frameIndex = useAnimation(2, 200); // Assuming 4-frame animation

  // Convert player and enemies into objects array used by animation loop

const objects = useMemo(() => {
  const playerObject = {
    x: playerPosition?.x ?? 0,
    y: playerPosition?.y ?? 0,
    size: tileSize,
    direction: "RIGHT",
    image: playerSprite,
    frameWidth: 32,
    frameHeight: 32,
    totalFrames: 2,
  };

  const enemyList = [];

  if (gameLevel && gameLevel.grid) {
    gameLevel.grid.forEach((row) => {
      row.forEach((tile) => {
        tile.getGameObjects().forEach((obj) => {
          if (obj.type === "enemy") {
            enemyList.push({
              ...obj,
              image: enemySprite,
              frameWidth: 32,
              frameHeight: 32,
              totalFrames: 2,
            });
          }
        });
      });
    });
  }

  return [playerObject, ...enemyList];
}, [playerPosition, gameLevel]);
 useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    ctx.imageSmoothingEnabled = false;

    let animationFrameId;

    const draw = () => {
      ctx.clearRect(0, 0, canvasSize, canvasSize);

      objects.forEach((obj) => {
        const { x, y, size, image, frameWidth, frameHeight, direction } = obj;

        const img = preloadImage(image);

        if (!img.complete || img.naturalWidth === 0) {
          ctx.fillStyle = "red";
          ctx.fillRect(x * tileSize, y * tileSize, size, size);
          // Don't draw until the image is fully loaded
          return;
        }

        const currentFrameX = getCurrentFrameX(frameIndex, frameWidth);

        ctx.save();

        if (direction === "LEFT") {
          ctx.scale(-1, 1);
          ctx.drawImage(
            img,
            currentFrameX, 0,
            frameWidth, frameHeight,
            -(x * tileSize + size), y * tileSize,
            size, size
          );
        } else {
          ctx.drawImage(
            img,
            currentFrameX, 0,
            frameWidth, frameHeight,
            x * tileSize, y * tileSize,
            size, size
          );
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(animationFrameId);
  }, [objects, frameIndex, canvasSize]);

  return <canvas ref={canvasRef} width={canvasSize} height={canvasSize} />;
};

export default CharacterCanvas;
