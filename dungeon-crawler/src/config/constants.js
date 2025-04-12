// Grid / tile config
export const TILE_SIZE = 30;
export const GRID_SIZE = 20;

// Animation
export const ANIMATION_FRAME_DURATION = 400; // ms
export const DEFAULT_FRAME_COUNT = 2;

// Directions
export const DIRECTIONS = ["UP", "DOWN", "LEFT", "RIGHT"];

// Object types
export const OBJECT_TYPES = {
  PLAYER: "player",
  ENEMY: "enemy",
  ITEM: "item",
  TILE: "tile",
};

// Game loop
export const TICK_INTERVAL = 1000; // ms

// Colors (fallbacks or debug)
export const TILE_COLORS = {
  floor: "#000000",
  wall: "#333333",
};
