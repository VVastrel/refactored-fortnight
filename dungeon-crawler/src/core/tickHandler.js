// utils/tickHandler.js
import { processEnemyTurn } from "../systems/EnemyAI";

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

  // Future systems can be added here:
  // - handle projectiles
  // - apply status effects (DOT, buffs)
  // - animate or animate environment
  // - spawn logic
  // - trigger environmental effects

  // Example:
  // updateProjectiles(gameWorld);
  // checkTriggers(gameWorld);

  // Log for debug:
  // console.log("[tickHandler] Tick processed.");
};
