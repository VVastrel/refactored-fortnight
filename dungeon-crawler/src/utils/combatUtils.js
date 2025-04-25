import { logMessage } from "../utils/GameLogger";
import store from "../redux/store";
import { takeDamage, selectPlayerStats } from "../redux/reducers/playerSlice";
import {
  damageEnemy,
  removeEnemy,
  selectEnemies,
} from "../redux/reducers/enemySlice";

/**
 * Executes an attack between two game objects.
 */

export const performAttack = (attacker, defender) => {
  const state = store.getState();

  const attackerStats = getStatsForObject(attacker, state);
  const defenderStats = getStatsForObject(defender, state);

  if (!attackerStats || !defenderStats) {
    console.warn(
      "Missing stats for attacker or defender:",
      attacker.id,
      defender.id,
    );
    return { killed: false };
  }

  if (attacker.type === "enemy") {
    logMessage("skeletonAttackIntro");
  }

  const attack = attackerStats.attack ?? 0;
  const defense = defenderStats.defense ?? 0;
  const damage = Math.max(0, attack - defense);

  //console.log(`${attacker.id} attacks ${defender.id} for ${damage} damage`);

  if (defender.type === "player") {
    if (damage === 0) {
      logMessage("enemyMiss");
    } else {
      logMessage("enemyHit");
    }

    store.dispatch(takeDamage(damage));
    const newHp = store.getState().player.stats.hp;
    if (newHp <= 0) {
      logMessage("playerDeath");
      logMessage("playerLastWords");
    }

    return { killed: newHp <= 0 };
  }

  if (defender.type === "enemy") {
    if (damage === 0) {
      logMessage("playerMiss");
    } else {
      logMessage("playerHit");
    }

    store.dispatch(damageEnemy({ id: defender.id, damage }));
    const updatedEnemy = selectEnemies(store.getState()).find(
      (e) => e.id === defender.id,
    );

    if (updatedEnemy?.stats?.hp <= 0) {
      logMessage("enemyDefeated");

      store.dispatch(removeEnemy(defender.id));
      return { killed: true };
    } else {
      logMessage("enemyDamaged");
    }
  }

  return { killed: false };
};

// Utility to get object stats based on type/id
const getStatsForObject = (object, state) => {
  if (object.type === "player") return selectPlayerStats(state);
  if (object.type === "enemy") {
    const enemy = selectEnemies(state).find((e) => e.id === object.id);
    return enemy?.stats ?? null;
  }
  return null;
};
