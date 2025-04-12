import React, { useRef, useEffect } from "react";
import { useAnimation } from "../hooks/useAnimation";
import { GameWorld } from "../core/GameWorld";
import { TILE_SIZE } from "../config/constants";

const tileSize = TILE_SIZE;
const CANVAS_SIZE = 20 * tileSize;

const CharacterCanvas = () => {
  const canvasRef = useRef(null);
  const frameIndex = useAnimation(2, 400); // Two-frame animation at 400ms intervals

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;
    ctx.imageSmoothingEnabled = false;

    let animationFrameId;

    const draw = () => {
      ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

      const objects = GameWorld.getAll();
      for (const obj of objects) {
        if (obj.canDraw?.()) {
          obj.draw(ctx, frameIndex); // your game objects handle their own draw logic
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationFrameId);
  }, [frameIndex]);

  return <canvas ref={canvasRef} />;
};

export default CharacterCanvas;
