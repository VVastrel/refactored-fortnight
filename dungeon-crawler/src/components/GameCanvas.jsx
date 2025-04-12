import React, { useRef, useEffect } from "react";
import { GameWorld } from "../core/GameWorld";
import { TILE_SIZE } from "../config/constants"; // Optional: move to shared config
import { useSelector } from "react-redux";
import { selectGrid } from "../redux/reducers/mapSlice";

const GameCanvas = () => {
  const canvasRef = useRef(null);
  const grid = useSelector(selectGrid); // Redux holds the map tile metadata

  useEffect(() => {
    if (!grid || !GameWorld.grid) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    const height = GameWorld.grid.length;
    const width = GameWorld.grid[0]?.length ?? 0;

    canvas.width = width * TILE_SIZE;
    canvas.height = height * TILE_SIZE;

    const draw = () => {
      for (const row of GameWorld.grid) {
        for (const tile of row) {
          // 🧱 Prefer Sprite draw if available
          if (tile.sprite?.draw) {
            tile.sprite.draw(ctx, tile.x, tile.y, TILE_SIZE);
          } else {
            // 🔲 Fallback to basic fill
            ctx.fillStyle = tile.type === "floor" ? "#000" : "#444";
            ctx.fillRect(tile.x * TILE_SIZE, tile.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
          }
        }
      }
    };

    draw();
  }, [grid]);

  return <canvas ref={canvasRef} />;
};

export default GameCanvas;
