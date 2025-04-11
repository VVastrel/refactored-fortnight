import { store } from "../redux/store.js";
import { takeDamage } from "../redux/reducers/playerSlice.js";
import { damageEnemy, removeEnemy } from "../redux/reducers/enemySlice.js";

/**
 * Executes attack from one character to another.
 * Both must be instances of Character or subclasses
 * */

export const performAttack = (attacker, defender) => {
  const attack = attacker.getAttackPower();
  const defense = defender.getDefense();
  const damage = Math.max(0, attack - defense);

  console.log(`${attacker.id} attacks ${defender.id} for ${damage} damage`);

  if (defender.type === "player") {
    // Apply damage to player
    store.dispatch(takeDamage(damage));
    const hp = store.getState().player.stats.hp;
    console.log(`Player HP: ${hp}`);

    return { killed: hp <= 0 };
  } else {
    // Apply damage to enemy
    store.dispatch(damageEnemy({ id: defender.id, damage }));

    // If enemy is killed, remove enemy.
    const updated = store
      .getState()
      .enemies.enemies.find((e) => e.id === defender.id);
    if (updated && updated.hp <= 0) {
      store.dispatch(removeEnemy(defender.id));
      console.log(`${defender.id} was defeated`);
      return { killed: true };
    }
    return { killed: false };
  }
};
