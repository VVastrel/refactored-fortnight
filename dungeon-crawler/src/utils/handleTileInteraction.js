import { GameWorld } from "../core/GameWorld";
import { performAttack } from "./combatUtils";
import {
  addItemToInventory,
  gainExperience,
} from "../redux/reducers/playerSlice";
import { removeGameObjectFromTile } from "../redux/reducers/mapSlice";

/**
 * Handles tile interactions (combat, pickups).
 * Returns true if movement should be blocked.
 */

export const handleTileInteraction = (tile, player, dispatch) => {
  const objects = GameWorld.getObjectsAt(tile.x, tile.y);

  // Combat with enemy
  const enemy = objects.find((obj) => obj.type === "enemy");
  if (enemy) {
    const result = performAttack(player, enemy);

    if (result.killed) {
      console.log(`${enemy.id} defeated — leaving body behind.`);
      GameWorld.removeObject(enemy.id);

      const xp = enemy.stats.maxHp;
      dispatch(gainExperience(xp));

      return true;
    }

    return true;
  }

  // Pick up item
  const item = objects.find((obj) => obj.type === "item");
  if (item) {
    console.log(`Picked up item: ${item.id}`);
    dispatch(addItemToInventory(item));

    GameWorld.removeObject(item.id);
    dispatch(
      removeGameObjectFromTile({
        x: tile.x,
        y: tile.y,
        gameObjectId: item.id,
      }),
    );

    return false;
  }

  return false;
};
