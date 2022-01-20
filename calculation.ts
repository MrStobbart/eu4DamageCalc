import { getFirstUnitByTech, techLevels } from "./testValues";
import { BattleResult, Phase, Player, PlayerModifiers, Regiment } from "./interfaces";

const averageRoll = 4.5;

export const calculateRelativePips = (currentPlayer: PlayerModifiers, enemyPlayer: PlayerModifiers, phase: Phase, isMoral: boolean) => {
  const attackPips = !isMoral ? currentPlayer.unit[phase].off : currentPlayer.unit.moral.off;
  const enemyDefensePips = !isMoral ? enemyPlayer.unit[phase].def : enemyPlayer.unit.moral.def;
  const relativeGeneralPips = currentPlayer.generalPips[phase] - enemyPlayer.generalPips[phase];

  return Math.max(0, relativeGeneralPips) + attackPips - enemyDefensePips;
};

export const calculateCasualitiesMultiplier = (regiment: Regiment, enemyPlayer: PlayerModifiers, day: number, phase: Phase) => {
  const tech = techLevels[regiment.tech];
  const enemyTactics = techLevels[enemyPlayer.tech].tactics * enemyPlayer.discipline;
  const combatAbility = 1 + regiment.unitCombatAbility[regiment.type];

  return (((regiment.troops / 1000) * tech.baseDamage[regiment.type][phase]) / enemyTactics) * combatAbility * regiment.discipline * (1 + day / 100);
};

export const calculateMoralCasualities = (casualityMultiplier: number, currentPlayer: Regiment, enemyPlayer: Regiment, phase: Phase) => {
  const relativePips = calculateRelativePips(currentPlayer, enemyPlayer, phase, true);
  const maxMoral = techLevels[currentPlayer.tech].baseMoral * (1 + currentPlayer.moralBonus);

  return ((15 + 5 * (averageRoll + relativePips)) * casualityMultiplier * maxMoral) / 540 + 0.03;
};

export const calculateStrengthCasualities = (casualityMultiplier: number, currentPlayer: Regiment, enemyPlayer: Regiment, phase: Phase) => {
  const relativePips = calculateRelativePips(currentPlayer, enemyPlayer, phase, false);
  return (15 + 5 * (averageRoll + relativePips)) * casualityMultiplier * (1 + currentPlayer.damangeModifiers[phase].dealt) * (1 + enemyPlayer.damangeModifiers[phase].received);
};

const getBattleResult = (regiment1: Regiment, regiment2: Regiment, logs = true): BattleResult => {
  const remaining = { regiment1Remaining: { troops: regiment1.troops, moral: regiment1.moral }, regiment2Remaining: { troops: regiment2.troops, moral: regiment2.moral } };

  if (regiment1.moral > regiment2.moral) {
    if (logs) console.log("+++++ Player1 wins +++++");
    return { winner: "regiment1", ...remaining };
  }
  if (regiment2.moral > regiment1.moral) {
    if (logs) console.log("+++++ Player2 wins +++++");
    return { winner: "regiment2", ...remaining };
  }
  if (logs) console.log("+++++ Draw +++++ ");
  return { winner: "draw", ...remaining };
};

let phaseCounter = 1;
export const battleDay = (player1: Regiment, player2: Regiment, day = 1, phase: Phase = "fire", logs = true): BattleResult => {
  if (logs) console.log({ day, phase, player1: { moral: player1.moral, toops: player1.troops }, player2: { moral: player2.moral, toops: player2.troops } });

  if (player1.moral <= 0 || player2.moral <= 0) {
    return getBattleResult(player1, player2, logs);
  }
  const casualitiesModifierPlayer1 = calculateCasualitiesMultiplier(player1, player2, day, phase);
  const casualitiesModifierPlayer2 = calculateCasualitiesMultiplier(player2, player1, day, phase);

  const damageFromPlayer1 = {
    casualitiesModifierPlayer1,
    moral: calculateMoralCasualities(casualitiesModifierPlayer1, player1, player2, phase),
    strength: calculateStrengthCasualities(casualitiesModifierPlayer1, player1, player2, phase),
  };

  const damageFromPlayer2 = {
    casualitiesModifierPlayer2,
    moral: calculateMoralCasualities(casualitiesModifierPlayer2, player2, player1, phase),
    strength: calculateStrengthCasualities(casualitiesModifierPlayer2, player2, player1, phase),
  };

  player1.moral = player1.moral - damageFromPlayer2.moral;
  player1.troops = player1.troops - damageFromPlayer2.strength;

  player2.moral = player2.moral - damageFromPlayer1.moral;
  player2.troops = player2.troops - damageFromPlayer1.strength;

  if (logs) console.log({ damageFromPlayer1, damageFromPlayer2 });

  const changePhase = phaseCounter === 3;
  let nextPhase = phase;
  phaseCounter++;

  if (changePhase) {
    nextPhase = phase === "fire" ? "shock" : "fire";
    phaseCounter = 1;
  }

  if (logs) console.log({ changePhase, nextPhase, phaseCounter });

  return battleDay(player1, player2, (day = day + 1), nextPhase, logs);
};

export const baseModifiers: PlayerModifiers = {
  tech: 10,
  generalPips: { shock: 0, fire: 0 },
  moralBonus: 0,
  discipline: 1,
  damangeModifiers: { fire: { received: 0, dealt: 0 }, shock: { received: 0, dealt: 0 } },
  unitCombatAbility: { infantry: 0, cavalry: 0, artillery: 0 },
  type: "infantry",
  unit: getFirstUnitByTech(10, "infantry"),
};

export const getRegimentFromPlayerModifiers = (customModifiers: Partial<PlayerModifiers>): Regiment => {
  const unit = customModifiers.unit ? customModifiers.unit : getFirstUnitByTech(customModifiers.tech || baseModifiers.tech);
  const playerModifiers = { ...baseModifiers, ...customModifiers, unit };
  return { ...playerModifiers, troops: 1000, moral: techLevels[playerModifiers.tech].baseMoral * (1 + playerModifiers.moralBonus) };
};
