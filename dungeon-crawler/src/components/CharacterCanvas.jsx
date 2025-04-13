import React, { useRef, useEffect } from "react";
import { useAnimation } from "../hooks/useAnimation";
import { GameWorld } from "../core/GameWorld";
import { CANVAS_SIZE } from "../config/constants";


const CharacterCanvas = () => {
  const canvasRef = useRef(null);
  const frameIndex = useAnimation(2, 400);
  const frameIndexRef = useRef(frameIndex);

useEffect(() => {
    frameIndexRef.current = frameIndex;
  }, [frameIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;
    ctx.imageSmoothingEnabled = false;

    let animationFrameId;


    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const objects = GameWorld.getAll();
      for (const obj of objects) {
        if (obj.canDraw?.()) {
          //console.log("frameIndexRef: ", frameIndexRef.current);
          obj.draw(ctx, frameIndexRef.current);
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return <canvas id="CharacterCanvas" ref={canvasRef} />};

export default CharacterCanvas;
