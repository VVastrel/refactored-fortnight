import {
  GRID_SIZE,
  MAX_ROOMS,
  ROOM_MIN_SIZE,
  ROOM_MAX_SIZE,
} from "../config/constants";

const TILE_WALL = "wall";
const TILE_FLOOR = "floor";

function createEmptyMap(width, height) {
  const grid = [];

  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      row.push({ x, y, type: TILE_WALL, gameObjectIds: [] });
    }
    grid.push(row);
  }

  return grid;
}

export function generateDungeon(
  width = GRID_SIZE,
  height = GRID_SIZE,
  maxRooms = MAX_ROOMS,
  roomMinSize = ROOM_MIN_SIZE,
  roomMaxSize = ROOM_MAX_SIZE,
) {
  const map = createEmptyMap(width, height);
  const rooms = [];

  // set type to floor for tiles inside room
  const placeRoom = (x, y, w, h) => {
    for (let i = y; i < y + h; i++) {
      for (let j = x; j < x + w; j++) {
        map[i][j].type = TILE_FLOOR;
      }
    }
  };

  // create horizontal tunnel
  const createHTunnel = (x1, x2, y) => {
    for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
      map[y][x].type = TILE_FLOOR;
    }
  };

  // create vertical tunnel
  const createVTunnel = (y1, y2, x) => {
    for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
      map[y][x].type = TILE_FLOOR;
    }
  };

  for (let i = 0; i < maxRooms; i++) {
    const w = rand(roomMinSize, roomMaxSize);
    const h = rand(roomMinSize, roomMaxSize);
    const x = rand(1, width - w - 1);
    const y = rand(1, height - h - 1);

    const newRoom = {
      x,
      y,
      w,
      h,
      center: [x + Math.floor(w / 2), y + Math.floor(h / 2)],
    };

    // check if
    let overlaps = false;
    for (const room of rooms) {
      if (
        x <= room.x + room.w &&
        x + w >= room.x &&
        y <= room.y + room.h &&
        y + h >= room.y
      ) {
        overlaps = true;
        break;
      }
    }

    if (!overlaps) {
      placeRoom(x, y, w, h);
      if (rooms.length > 0) {
        const [prevX, prevY] = rooms[rooms.length - 1].center;
        const [newX, newY] = newRoom.center;
        if (Math.random() < 0.5) {
          createHTunnel(prevX, newX, prevY);
          createVTunnel(prevY, newY, newX);
        } else {
          createVTunnel(prevY, newY, prevX);
          createHTunnel(prevX, newX, newY);
        }
      }
      rooms.push(newRoom);
    }
  }
  const firstRoom = rooms[0];
  const lastRoom = rooms[rooms.length - 1];

  const [stairX, stairY] = lastRoom.center;
  map[stairY][stairX].type = "stair";

  const [playerX, playerY] = firstRoom.center;
  const playerPosition = { x: playerX, y: playerY };

  return { grid: map, playerPosition };
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
