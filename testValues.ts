import { Player, BaseValues } from "./interfaces";

/**
 * Set values here
 * Base Casualities can be increased to simulate extra general pips (2.5 per extra shock or fire)
 */

// Tech 26
// const baseMoral = 5;
// const baseTactics = 3;
// const baseValues: BaseValues = {
//   unitModifier: 1.6,
//   phaseModifier: 1,
//   combatAbility: 1,
//   troops: 1000,
//   baseCasualities: 15,
// };

// const player1MoralBonus = 1;
// const player1Discipline = 1;
// export const player1: Player = {
//   ...baseValues,
//   discipline: player1Discipline,
//   tactics: baseTactics * player1Discipline,
//   maxMoral: baseMoral * player1MoralBonus,
//   currentMoral: baseMoral * player1MoralBonus,
// };

// const player2MoralBonus = 1;
// const player2Discipline = 1.1;
// export const player2: Player = {
//   ...baseValues,
//   discipline: player2Discipline,
//   tactics: baseTactics * player2Discipline,
//   maxMoral: baseMoral * player2MoralBonus,
//   currentMoral: baseMoral * player2MoralBonus,
// };

// Tech 6
const baseMoral = 3;
const baseTactics = 1;
const baseValues: BaseValues = {
  unitModifier: 0.55,
  phaseModifier: 1,
  combatAbility: 1,
  troops: 1000,
  baseCasualities: 15,
};

const player1MoralBonus = 1;
const player1Discipline = 1;
export const player1: Player = {
  ...baseValues,
  discipline: player1Discipline,
  tactics: baseTactics * player1Discipline,
  maxMoral: baseMoral * player1MoralBonus,
  currentMoral: baseMoral * player1MoralBonus,
  baseCasualities: 17.5,
};

const player2MoralBonus = 1;
const player2Discipline = 1.08;
export const player2: Player = {
  ...baseValues,
  discipline: player2Discipline,
  tactics: baseTactics * player2Discipline,
  maxMoral: baseMoral * player2MoralBonus,
  currentMoral: baseMoral * player2MoralBonus,
};
