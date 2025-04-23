import React, { useEffect, useRef } from "react";
import { GameWorld } from "../core/GameWorld";
import { TILE_SIZE } from "../config/constants";
import { useSelector } from "react-redux";
import { selectGrid } from "../redux/reducers/mapSlice";
import wallImage from "../assets/spr_wll.png";
import stairImage from "../assets/spr_str.png";


const GameCanvas = () => {
  const canvasRef = useRef(null);
  const grid = useSelector(selectGrid);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!grid || !canvas || !ctx) return;

    const stairImg = new Image();
    stairImg.src = stairImage;
    const wallImg = new Image();
    wallImg.src = wallImage;

    wallImg.onload = () => {
      canvas.width = grid[0].length * TILE_SIZE;
      canvas.height = grid.length * TILE_SIZE;
      ctx.imageSmoothingEnabled = false;

      for (const row of grid) {
        for (const tile of row) {
          const x = tile.x * TILE_SIZE;
          const y = tile.y * TILE_SIZE;

          if (tile.type === "wall") {
            ctx.drawImage(wallImg, x, y, TILE_SIZE, TILE_SIZE);
          } else if (tile.type === "stair") {
            ctx.drawImage(stairImg, x, y, TILE_SIZE, TILE_SIZE);
          } else {
            ctx.fillStyle = "#000";
            ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
          }
        }
      }
    };
  }, [grid]);

  return <canvas id="GameCanvas" ref={canvasRef} />;
};

export default GameCanvas;
