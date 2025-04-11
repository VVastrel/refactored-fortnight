import { performAttack } from "./combatUtils";

/**
 * Handles tile interaction (combat, items).
 * Returns true if movement should be blocked.
 */
export const handleTileInteraction = (tile, player, dispatch) => {
  const enemy = tile.getGameObjects().find((obj) => obj.type === "enemy");

  if (enemy) {
    //console.log(`Combat! Player attacks ${enemy.id}`);
    const result = performAttack(player, enemy);

    if (result.killed) {
      console.log(`${enemy.id} defeated — leaving body behind.`);
      return true; // still block movement (body remains)
    }

    return true; // block movement — enemy still alive
  }

  const item = tile.getGameObjects().find((obj) => obj.type === "item");

  if (item) {
    console.log(`Picked up item: ${item.id}`);
    dispatch({ type: "player/addItemToInventory", payload: item });
    dispatch({
      type: "map/removeGameObjectFromTile",
      payload: {
        x: tile.x,
        y: tile.y,
        gameObjectId: item.id,
      },
    });
    return false; // movement allowed
  }

  return false; // nothing blocked
};
