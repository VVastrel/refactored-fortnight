import { performAttack } from "./combatUtils";

export const handleTileInteraction = (tile, player, dispatch) => {
  const enemy = tile.getGameObjects().find((obj) => obj.type === "enemy");
  if (enemy) {
    performAttack(player, enemy);
    return true; // tile interaction happened, don't move
  }

  const item = tile.getGameObjects().find((obj) => obj.type === "item");
  if (item) {
    dispatch({
      type: "player/addItemToInventory",
      payload: item,
    });
    dispatch({
      type: "map/removeGameObjectFromTile",
      payload: { x: tile.x, y: tile.y, gameObjectId: item.id },
    });
    return false; // movement still allowed
  }

  return false; // no enemy or item, safe to move
};
