import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectGameLevel } from "../redux/reducers/mapSlice.js";

const GameCanvas = () => {
  const canvasRef = useRef(null);
  const gameLevel = useSelector(selectGameLevel);
  const tileSize = 30;

  useEffect(() => {
    if (!gameLevel) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const drawMap = (ctx) => {
      const grid = gameLevel.grid;
      grid.forEach((row, y) => {
        row.forEach((tile, x) => {
          const color = tile.type === "wall" ? "white" : "black";
          ctx.fillStyle = color;
          ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
          if (color === "gray") {
            ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
          }

          tile.getGameObjects().forEach((obj) => {
            if (obj.canDraw()) {
              obj.draw(ctx);
            }
          });
        });
      });
    };

    drawMap(ctx);
  }, [gameLevel]);

  if (!gameLevel) return null;

  return <canvas ref={canvasRef} width={gameLevel.size * tileSize} height={gameLevel.size * tileSize} />;
};

export default GameCanvas;
