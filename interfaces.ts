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

export type Phase = "fire" | "shock";

export type UnitType = "infantry" | "cavalry" | "artillery";

export interface CurrentRegimentStrength {
  troops: number;
  moral: number;
}

export type Regiment = PlayerModifiers & CurrentRegimentStrength;

type UnitCombatAbility = {
  [key in UnitType]: number; // 0 - 0% bonus is default
};

type PlayerDamageModifiers = {
  [key in Phase]: {
    dealt: number; // 0 - 0% bonus is default, positive values are good
    received: number; // 0 - 0% bonus is default negative values are good
  };
};

type GeneralPips = {
  [key in Phase]: number;
};
export interface PlayerModifiers {
  tech: number; // 0 to 30
  type: UnitType;
  unit: Unit;
  generalPips: GeneralPips;
  moralBonus: number; // 0 - 0% Bonus is default
  discipline: number; // 1 - 100% is default
  damangeModifiers: PlayerDamageModifiers;
  unitCombatAbility: UnitCombatAbility;
}

export interface Pips {
  off: number;
  def: number;
}
export interface Unit {
  tech: number;
  fire: Pips;
  shock: Pips;
  moral: Pips;
  name: string;
}

type BaseDamage = {
  [key in UnitType]: {
    fire: number;
    shock: number;
  };
};

export interface TechLevel {
  tech: number;
  baseMoral: number;
  tactics: number;
  improvedFlanking: number;
  combatWidth: number;
  supplyLimit: number;
  baseDamage: BaseDamage;
}

export interface BattleResult {
  winner: "regiment1" | "regiment2" | "draw";
  regiment1Remaining: CurrentRegimentStrength;
  regiment2Remaining: CurrentRegimentStrength;
}
