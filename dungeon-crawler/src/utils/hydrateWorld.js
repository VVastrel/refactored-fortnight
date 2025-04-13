import { GameWorld } from "../core/GameWorld";
import { preloadImage } from "../utils/animationUtils";
import {
  GRID_SIZE,
  TILE_SIZE,
  FRAME_WIDTH,
  FRAME_HEIGHT,
  DEFAULT_FRAME_COUNT,
} from "../config/constants";
import store from "../redux/store";
import { setMapReady, setGrid } from "../redux/reducers/mapSlice";
import GameLevel from "../models/GameLevel";

import Player from "../models/Player";
import Enemy from "../models/Enemy";
import Tile from "../models/Tile";
import Sprite from "../models/Sprite";

import enemySpritePath from "../assets/spr_skl_1.png";
import playerSpritePath from "../assets/spriteSheet.png";
import wallSpritePath from "../assets/spr_wll.png";

// Preload images
const wallImage = preloadImage(wallSpritePath);
const floorColor = "#000";

const playerImage = preloadImage(playerSpritePath);
const playerSprite = new Sprite({
  image: playerImage,
  frameWidth: FRAME_WIDTH,
  frameHeight: FRAME_HEIGHT,
  totalFrames: DEFAULT_FRAME_COUNT,
  direction: "RIGHT",
});

const enemyImage = preloadImage(enemySpritePath);
const enemySprite = new Sprite({
  image: enemyImage,
  frameWidth: FRAME_WIDTH,
  frameHeight: FRAME_HEIGHT,
  totalFrames: DEFAULT_FRAME_COUNT,
  direction: "RIGHT",
});

export const hydrateWorld = () => {
  GameWorld.reset();

  const state = store.getState();

  const playerState = state.player;
  const enemiesState = state.enemies.enemies;
  const gameLevel = new GameLevel(GRID_SIZE);
  const mapState = gameLevel.getGrid();

  // === 1. Hydrate Player ===
  const player = new Player(
    "player",
    playerState.playerPosition.x,
    playerState.playerPosition.y,
    playerSprite,
  );
  player.applyStats(playerState.stats);
  GameWorld.addObject(player);

  // === 2. Hydrate Enemies ===
  for (const enemyData of enemiesState) {
    const { id, x, y, stats } = enemyData;
    const enemy = new Enemy(id, x, y, enemySprite);
    enemy.applyStats(stats);
    GameWorld.addObject(enemy);
  }

  // === 3. Hydrate Tiles ===
  const memoryGrid = gameLevel.grid.map((row, y) =>
    row.map((tileData, x) => {
      const sprite = new Sprite({
        image: tileData.type === "wall" ? wallImage : floorColor,
      });

      const tile = new Tile(x, y, tileData.type, sprite);

      tileData.gameObjectIds.forEach((id) => {
        const obj = GameWorld.getObject(id);
        if (obj) tile.addGameObject(obj);
      });

      return tile;
    }),
  );

  GameWorld.setGrid(memoryGrid);
  store.dispatch(setGrid(mapState));
  store.dispatch(setMapReady(true));

  console.log("[hydrateWorld] Game world rehydrated.");
};
