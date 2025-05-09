// Grid / tile config
export const TILE_SIZE = 32;
export const GRID_SIZE = 20;
export const GRID_HEIGHT = 20;
export const GRID_WIDTH = 20;

// Canvas
export const CANVAS_WIDTH = TILE_SIZE * GRID_WIDTH;
export const CANVAS_HEIGHT = TILE_SIZE * GRID_HEIGHT;
export const CANVAS_SIZE = TILE_SIZE * GRID_SIZE;

// Map config
export const MAX_ROOMS = 20;
export const ROOM_MIN_SIZE = 4;
export const ROOM_MAX_SIZE = 7;

// Log config
export const MAX_LOG_LENGTH = 100;

// Animation
export const ANIMATION_FRAME_DURATION = 400; // ms
export const DEFAULT_FRAME_COUNT = 2;
export const FRAME_WIDTH = 32;
export const FRAME_HEIGHT = 32;

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

export const TILE_COLORS = {
  floor: "#000000",
  wall: "#333333",
};
