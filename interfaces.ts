export interface BaseValues {
  unitModifier: number;
  phaseModifier: number;
  combatAbility: number;
  troops: number;
  baseCasualities: number;
}

export interface Player extends BaseValues {
  discipline: number;
  tactics: number;
  maxMoral: number;
  currentMoral: number;
}
