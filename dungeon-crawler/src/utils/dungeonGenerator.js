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

  // Place stairs to the next level, into the center of last room
  const [stairX, stairY] = lastRoom.center;
  map[stairY][stairX].type = "stair";

  // Place player into the center of first room
  const [playerX, playerY] = firstRoom.center;
  const playerPosition = { x: playerX, y: playerY };

  // Helper to randomly select an element from an array
  function randomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Generate enemies
  // Place enemies randomly in the rooms
  // No enemies in the first room
  const eligibleRooms = rooms.slice(1, rooms.length - 1); // exclude player room
  const enemies = [];
  // TODO: Number of enemies based on dungeon level
  // TODO: Enemy stats increase with dungeon level
  const numberOfEnemies = Math.min(10, eligibleRooms.length * 2);

  for (let i = 0; i < numberOfEnemies; i++) {
    const room = randomElement(eligibleRooms);
    const enemyX = rand(room.x + 1, room.x + room.w - 2);
    const enemyY = rand(room.y + 1, room.y + room.h - 2);

    const enemy = {
      id: `enemy-${i.toString().padStart(3, "0")}`,
      type: "enemy",
      x: enemyX,
      y: enemyY,
      stats: {
        hp: 5,
        maxHp: 5,
        attack: 2,
        defense: 0,
      },
    };

    enemies.push(enemy);
    map[enemyY][enemyX].gameObjectIds.push(enemy.id);
  }

  return { grid: map, playerPosition, enemies };
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
