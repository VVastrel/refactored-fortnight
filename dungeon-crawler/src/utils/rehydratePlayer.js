import Player from "../models/Player";
import { store } from "../redux/store";
import playerSprite from "../assets/spriteSheet.png";

export const rehydratePlayer = () => {
  const { playerPosition, stats } = store.getState().player;
  const player = new Player(
    "player",
    playerPosition.x,
    playerPosition.y,
    playerSprite,
  );
  player.stats = stats;
  return player;
};
