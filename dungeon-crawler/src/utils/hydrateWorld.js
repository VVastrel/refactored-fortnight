import { GameWorld } from "../core/GameWorld";
import store from "../redux/store";
import Player from "../models/Player";
import Enemy from "../models/Enemy";
import Tile from "../models/Tile";

import enemySprite from "../assets/spr_skl_1.png";
import playerSprite from "../assets/spriteSheet.png";

/**
 * Rebuilds the in-memory world from Redux state.
 */
export const hydrateWorld = () => {
  GameWorld.reset();

  const state = store.getState();

  const playerState = state.player;
  const enemiesState = state.enemies.enemies;
  const mapState = state.map;

  // 1. Create all game objects first
  const player = new Player(
    "player",
    playerState.playerPosition.x,
    playerState.playerPosition.y,
    playerSprite,
  );
  player.applyStats(playerState.stats);
  GameWorld.addObject(player);

  for (const enemyData of enemiesState) {
    const { id, x, y, stats } = enemyData;
    const enemy = new Enemy(id, x, y, enemySprite);
    enemy.applyStats(stats);
    GameWorld.addObject(enemy);
  }

  // 2. Create in-memory grid using Tile class
  const memoryGrid = mapState.grid.map((row, y) =>
    row.map((tileData, x) => {
      const tile = new Tile(x, y);
      tile.type = tileData.type;

      // 3. Link referenced game objects by ID
      tileData.gameObjectIds.forEach((id) => {
        const obj = GameWorld.getObject(id);
        if (obj) {
          tile.addGameObject(obj);
        }
      });

      return tile;
    }),
  );

  GameWorld.setGrid(memoryGrid);

  console.log("[hydrateWorld] Game world reconstructed from Redux.");
};
