import { hydrateWorld } from "../utils/hydrateWorld";
import { GameWorld } from "./GameWorld";
import { tickHandler } from "./tickHandler";
import store from "../redux/store";
import {
  setGrid,
  setMapReady,
  increaseDungeonLevel,
} from "../redux/reducers/mapSlice";
import { setPlayerPosition } from "../redux/reducers/playerSlice";
import { generateDungeon } from "../utils/dungeonGenerator";
import { setEnemies } from "../redux/reducers/enemySlice";

let intervalId = null;
const TICK_INTERVAL = 1000;

const GameLoop = {
  mode: "turn",
  running: false,
  onTickCallback: null,

  start(mode = "realtime") {
    if (this.running) return;
    this.running = true;

    this.mode = mode;
    this.newLevel();
    //this.loadWorld();

    if (intervalId) clearInterval(intervalId);

    if (mode === "realtime") {
      intervalId = setInterval(() => this.tick(), TICK_INTERVAL);
    }

    console.log(`[GameLoop] Started in ${mode} mode.`);
  },

  stop() {
    if (intervalId) clearInterval(intervalId);
    intervalId = null;
    this.running = false;
    console.log("[GameLoop] Stopped.");
  },

  tick() {
    if (store.getState().game.isPaused) return;

    // Run systems via tick handler
    tickHandler(GameWorld);

    if (this.onTickCallback) {
      this.onTickCallback(GameWorld);
    }
  },

  runTurn() {
    if (this.mode === "turn") {
      this.tick();
    }
  },

  step() {
    // manual step for testing
    this.tick();
  },

  loadWorld() {
    hydrateWorld();
  },

  newLevel() {
    store.dispatch(increaseDungeonLevel());

    const level = store.getState().map.dungeonLevel;
    const { grid, playerPosition, enemies } = generateDungeon(level);

    store.dispatch(setMapReady(false));
    store.dispatch(setGrid({ grid }));
    store.dispatch(setPlayerPosition(playerPosition));
    store.dispatch(setEnemies(enemies));

    setTimeout(() => {
      this.loadWorld();
    }, 0);
  },

  getMode() {
    return this.mode;
  },

  getWorld() {
    return GameWorld;
  },
};

export default GameLoop;
