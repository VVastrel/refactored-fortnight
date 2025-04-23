import { processEnemyTurn } from "../core/EnemyAI";

/**
 * Main tick logic handler.
 * Called by GameLoop on each tick.
 * Receives the current GameWorld instance.
 */

export const tickHandler = (gameWorld) => {
  if (!gameWorld) {
    console.warn("[tickHandler] No GameWorld available.");
    return;
  }

  // Run enemy logic (movement + attacks)
  processEnemyTurn(gameWorld);

  // Log for debug:
  // console.log("[tickHandler] Tick processed.");
};
