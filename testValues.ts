import { Player, BaseValues, UnitType, Unit, TechLevel, PlayerModifiers, Regiment } from "./interfaces";

export const techLevels: TechLevel[] = [
  { tech: 0, baseDamage: { infantry: { fire: 0.25, shock: 0.2 }, cavalry: { fire: 0.0, shock: 0.8 }, artillery: { fire: 0.0, shock: 0.0 } }, baseMoral: 2.0, tactics: 0.5, improvedFlanking: 0, combatWidth: 15, supplyLimit: 0 },
  { tech: 1, baseDamage: { infantry: { fire: 0.35, shock: 0.3 }, cavalry: { fire: 0.0, shock: 0.8 }, artillery: { fire: 0.0, shock: 0.0 } }, baseMoral: 2.0, tactics: 0.5, improvedFlanking: 0, combatWidth: 15, supplyLimit: 0 },
  { tech: 2, baseDamage: { infantry: { fire: 0.35, shock: 0.5 }, cavalry: { fire: 0.0, shock: 1.0 }, artillery: { fire: 0.0, shock: 0.0 } }, baseMoral: 2.0, tactics: 0.5, improvedFlanking: 0, combatWidth: 20, supplyLimit: 0 },
  { tech: 3, baseDamage: { infantry: { fire: 0.35, shock: 0.5 }, cavalry: { fire: 0.0, shock: 1.0 }, artillery: { fire: 0.0, shock: 0.0 } }, baseMoral: 2.5, tactics: 0.5, improvedFlanking: 0, combatWidth: 20, supplyLimit: 0 },
  { tech: 4, baseDamage: { infantry: { fire: 0.35, shock: 0.5 }, cavalry: { fire: 0.0, shock: 1.0 }, artillery: { fire: 0.0, shock: 0.0 } }, baseMoral: 3.0, tactics: 0.75, improvedFlanking: 0, combatWidth: 20, supplyLimit: 0 },
  { tech: 5, baseDamage: { infantry: { fire: 0.35, shock: 0.65 }, cavalry: { fire: 0.0, shock: 1.2 }, artillery: { fire: 0.0, shock: 0.0 } }, baseMoral: 3.0, tactics: 0.75, improvedFlanking: 0, combatWidth: 22, supplyLimit: 0.5 },
  { tech: 6, baseDamage: { infantry: { fire: 0.55, shock: 0.95 }, cavalry: { fire: 0.0, shock: 1.2 }, artillery: { fire: 0.0, shock: 0.0 } }, baseMoral: 3.0, tactics: 1.0, improvedFlanking: 0, combatWidth: 24, supplyLimit: 0.5 },
  { tech: 7, baseDamage: { infantry: { fire: 0.55, shock: 0.95 }, cavalry: { fire: 0.0, shock: 1.2 }, artillery: { fire: 1.0, shock: 0.05 } }, baseMoral: 3.0, tactics: 1.25, improvedFlanking: 0, combatWidth: 24, supplyLimit: 0.5 },
  { tech: 8, baseDamage: { infantry: { fire: 0.8, shock: 0.95 }, cavalry: { fire: 0.0, shock: 2.0 }, artillery: { fire: 1.0, shock: 0.05 } }, baseMoral: 3.0, tactics: 1.25, improvedFlanking: 0, combatWidth: 24, supplyLimit: 0.5 },
  { tech: 9, baseDamage: { infantry: { fire: 0.8, shock: 0.95 }, cavalry: { fire: 0.0, shock: 2.0 }, artillery: { fire: 1.0, shock: 0.05 } }, baseMoral: 3.0, tactics: 1.5, improvedFlanking: 0, combatWidth: 25, supplyLimit: 0.5 },
  { tech: 10, baseDamage: { infantry: { fire: 0.8, shock: 0.95 }, cavalry: { fire: 0.0, shock: 2.0 }, artillery: { fire: 1.0, shock: 0.05 } }, baseMoral: 3.0, tactics: 1.5, improvedFlanking: 0.25, combatWidth: 25, supplyLimit: 0.5 },
  { tech: 11, baseDamage: { infantry: { fire: 0.8, shock: 1.15 }, cavalry: { fire: 0.5, shock: 2.0 }, artillery: { fire: 1.0, shock: 0.05 } }, baseMoral: 3.0, tactics: 1.5, improvedFlanking: 0.25, combatWidth: 27, supplyLimit: 0.5 },
  { tech: 12, baseDamage: { infantry: { fire: 0.8, shock: 1.15 }, cavalry: { fire: 0.5, shock: 2.0 }, artillery: { fire: 1.0, shock: 0.05 } }, baseMoral: 3.0, tactics: 1.75, improvedFlanking: 0.25, combatWidth: 27, supplyLimit: 1 },
  { tech: 13, baseDamage: { infantry: { fire: 0.8, shock: 1.15 }, cavalry: { fire: 0.5, shock: 2.0 }, artillery: { fire: 1.4, shock: 0.15 } }, baseMoral: 3.0, tactics: 1.75, improvedFlanking: 0.25, combatWidth: 27, supplyLimit: 1 },
  { tech: 14, baseDamage: { infantry: { fire: 1.1, shock: 1.15 }, cavalry: { fire: 0.5, shock: 2.0 }, artillery: { fire: 1.4, shock: 0.15 } }, baseMoral: 3.0, tactics: 1.75, improvedFlanking: 0.25, combatWidth: 29, supplyLimit: 1 },
  { tech: 15, baseDamage: { infantry: { fire: 1.1, shock: 1.15 }, cavalry: { fire: 0.5, shock: 2.0 }, artillery: { fire: 1.4, shock: 0.15 } }, baseMoral: 4.0, tactics: 2.0, improvedFlanking: 0.25, combatWidth: 29, supplyLimit: 1 },
  { tech: 16, baseDamage: { infantry: { fire: 1.1, shock: 1.15 }, cavalry: { fire: 0.5, shock: 2.0 }, artillery: { fire: 2.4, shock: 0.25 } }, baseMoral: 4.0, tactics: 2.0, improvedFlanking: 0.25, combatWidth: 30, supplyLimit: 1 },
  { tech: 17, baseDamage: { infantry: { fire: 1.1, shock: 1.15 }, cavalry: { fire: 0.5, shock: 3.0 }, artillery: { fire: 2.4, shock: 0.25 } }, baseMoral: 4.0, tactics: 2.0, improvedFlanking: 0.25, combatWidth: 30, supplyLimit: 1.5 },
  { tech: 18, baseDamage: { infantry: { fire: 1.1, shock: 1.15 }, cavalry: { fire: 0.5, shock: 3.0 }, artillery: { fire: 2.4, shock: 0.25 } }, baseMoral: 4.0, tactics: 2.0, improvedFlanking: 0.5, combatWidth: 32, supplyLimit: 1.5 },
  { tech: 19, baseDamage: { infantry: { fire: 1.1, shock: 1.15 }, cavalry: { fire: 0.5, shock: 3.0 }, artillery: { fire: 2.4, shock: 0.25 } }, baseMoral: 4.0, tactics: 2.25, improvedFlanking: 0.5, combatWidth: 32, supplyLimit: 2 },
  { tech: 20, baseDamage: { infantry: { fire: 1.6, shock: 1.15 }, cavalry: { fire: 0.5, shock: 3.0 }, artillery: { fire: 2.4, shock: 0.25 } }, baseMoral: 4.0, tactics: 2.25, improvedFlanking: 0.5, combatWidth: 34, supplyLimit: 2 },
  { tech: 21, baseDamage: { infantry: { fire: 1.6, shock: 1.65 }, cavalry: { fire: 0.5, shock: 3.0 }, artillery: { fire: 2.4, shock: 0.25 } }, baseMoral: 4.0, tactics: 2.5, improvedFlanking: 0.5, combatWidth: 34, supplyLimit: 2 },
  { tech: 22, baseDamage: { infantry: { fire: 1.6, shock: 1.65 }, cavalry: { fire: 1.0, shock: 3.0 }, artillery: { fire: 4.4, shock: 0.35 } }, baseMoral: 4.0, tactics: 2.5, improvedFlanking: 0.5, combatWidth: 36, supplyLimit: 2 },
  { tech: 23, baseDamage: { infantry: { fire: 1.6, shock: 1.65 }, cavalry: { fire: 1.0, shock: 4.0 }, artillery: { fire: 4.4, shock: 0.35 } }, baseMoral: 4.0, tactics: 2.75, improvedFlanking: 1, combatWidth: 36, supplyLimit: 2 },
  { tech: 24, baseDamage: { infantry: { fire: 1.6, shock: 1.65 }, cavalry: { fire: 1.0, shock: 4.0 }, artillery: { fire: 4.4, shock: 0.35 } }, baseMoral: 4.0, tactics: 3.0, improvedFlanking: 1, combatWidth: 38, supplyLimit: 2 },
  { tech: 25, baseDamage: { infantry: { fire: 1.6, shock: 1.65 }, cavalry: { fire: 1.0, shock: 4.0 }, artillery: { fire: 6.4, shock: 0.45 } }, baseMoral: 4.0, tactics: 3.0, improvedFlanking: 1, combatWidth: 38, supplyLimit: 2 },
  { tech: 26, baseDamage: { infantry: { fire: 1.6, shock: 1.65 }, cavalry: { fire: 1.0, shock: 4.0 }, artillery: { fire: 6.4, shock: 0.45 } }, baseMoral: 5.0, tactics: 3.0, improvedFlanking: 1, combatWidth: 40, supplyLimit: 2 },
  { tech: 27, baseDamage: { infantry: { fire: 2.1, shock: 1.65 }, cavalry: { fire: 1.0, shock: 4.0 }, artillery: { fire: 6.4, shock: 0.45 } }, baseMoral: 5.0, tactics: 3.0, improvedFlanking: 1, combatWidth: 40, supplyLimit: 2.5 },
  { tech: 28, baseDamage: { infantry: { fire: 2.1, shock: 2.15 }, cavalry: { fire: 1.0, shock: 4.0 }, artillery: { fire: 6.4, shock: 0.45 } }, baseMoral: 5.0, tactics: 3.0, improvedFlanking: 1.25, combatWidth: 40, supplyLimit: 2.5 },
  { tech: 29, baseDamage: { infantry: { fire: 2.1, shock: 2.15 }, cavalry: { fire: 1.0, shock: 4.0 }, artillery: { fire: 6.4, shock: 0.45 } }, baseMoral: 5.0, tactics: 3.0, improvedFlanking: 1.25, combatWidth: 40, supplyLimit: 2.5 },
  { tech: 30, baseDamage: { infantry: { fire: 2.1, shock: 2.15 }, cavalry: { fire: 1.0, shock: 4.0 }, artillery: { fire: 6.4, shock: 0.45 } }, baseMoral: 6.0, tactics: 3.25, improvedFlanking: 1.5, combatWidth: 40, supplyLimit: 2.5 },
  { tech: 31, baseDamage: { infantry: { fire: 3.1, shock: 2.15 }, cavalry: { fire: 1.0, shock: 5.0 }, artillery: { fire: 6.4, shock: 0.45 } }, baseMoral: 6.0, tactics: 3.25, improvedFlanking: 1.5, combatWidth: 40, supplyLimit: 3 },
  { tech: 32, baseDamage: { infantry: { fire: 3.1, shock: 2.15 }, cavalry: { fire: 1.0, shock: 5.0 }, artillery: { fire: 8.4, shock: 0.55 } }, baseMoral: 6.0, tactics: 3.5, improvedFlanking: 1.5, combatWidth: 40, supplyLimit: 3 },
];

export const westernInfrantryUnits: Unit[] = [
  { tech: 1, fire: { off: 0, def: 0 }, shock: { off: 1, def: 0 }, moral: { off: 1, def: 0 }, name: "Halberd Infantry" },
  { tech: 1, fire: { off: 0, def: 0 }, shock: { off: 0, def: 0 }, moral: { off: 1, def: 1 }, name: "Latin Medieval Infantry" },
  { tech: 5, fire: { off: 0, def: 0 }, shock: { off: 1, def: 0 }, moral: { off: 2, def: 0 }, name: "Galloglaigh Infantry" },
  { tech: 5, fire: { off: 0, def: 0 }, shock: { off: 1, def: 0 }, moral: { off: 1, def: 1 }, name: "Longbow" },
  { tech: 5, fire: { off: 0, def: 0 }, shock: { off: 0, def: 1 }, moral: { off: 1, def: 1 }, name: "Men at Arms" },
  { tech: 9, fire: { off: 0, def: 0 }, shock: { off: 2, def: 1 }, moral: { off: 1, def: 1 }, name: "Condotta Infantry" },
  { tech: 9, fire: { off: 0, def: 0 }, shock: { off: 1, def: 1 }, moral: { off: 1, def: 2 }, name: "Landsknechten Infantry" },
  { tech: 9, fire: { off: 0, def: 0 }, shock: { off: 2, def: 0 }, moral: { off: 2, def: 1 }, name: "Reformed Galloglaigh Infantry" },
  { tech: 12, fire: { off: 1, def: 2 }, shock: { off: 2, def: 1 }, moral: { off: 3, def: 1 }, name: "Free Shooter Infantry" },
  { tech: 12, fire: { off: 1, def: 2 }, shock: { off: 1, def: 2 }, moral: { off: 2, def: 2 }, name: "Tercio Infantry" },
  { tech: 15, fire: { off: 1, def: 2 }, shock: { off: 3, def: 1 }, moral: { off: 3, def: 2 }, name: "Charge Infantry" },
  { tech: 15, fire: { off: 2, def: 2 }, shock: { off: 2, def: 1 }, moral: { off: 3, def: 2 }, name: "Maurician Infantry" },
  { tech: 19, fire: { off: 3, def: 2 }, shock: { off: 3, def: 2 }, moral: { off: 3, def: 2 }, name: "Gustavian Infantry" },
  { tech: 19, fire: { off: 2, def: 2 }, shock: { off: 3, def: 2 }, moral: { off: 4, def: 2 }, name: "Highlanders Infantry" },
  { tech: 19, fire: { off: 2, def: 2 }, shock: { off: 2, def: 3 }, moral: { off: 3, def: 3 }, name: "Reformed Tercio" },
  { tech: 23, fire: { off: 3, def: 2 }, shock: { off: 3, def: 2 }, moral: { off: 3, def: 3 }, name: "Caroline Infantry" },
  { tech: 23, fire: { off: 2, def: 3 }, shock: { off: 2, def: 3 }, moral: { off: 3, def: 3 }, name: "Grenzer Infantry" },
  { tech: 23, fire: { off: 3, def: 3 }, shock: { off: 2, def: 2 }, moral: { off: 3, def: 3 }, name: "Line Infantry" },
  { tech: 26, fire: { off: 3, def: 3 }, shock: { off: 3, def: 3 }, moral: { off: 4, def: 4 }, name: "Blue Coat Infantry" },
  { tech: 26, fire: { off: 4, def: 3 }, shock: { off: 3, def: 3 }, moral: { off: 4, def: 3 }, name: "Frederickian Infantry" },
  { tech: 26, fire: { off: 3, def: 4 }, shock: { off: 3, def: 3 }, moral: { off: 4, def: 3 }, name: "Red Coat Infantry" },
  { tech: 26, fire: { off: 4, def: 3 }, shock: { off: 3, def: 3 }, moral: { off: 3, def: 4 }, name: "White Coat Infantry" },
  { tech: 28, fire: { off: 4, def: 3 }, shock: { off: 3, def: 3 }, moral: { off: 4, def: 4 }, name: "Impulse Infantry" },
  { tech: 28, fire: { off: 3, def: 4 }, shock: { off: 3, def: 3 }, moral: { off: 4, def: 4 }, name: "Square Infantry" },
  { tech: 30, fire: { off: 4, def: 4 }, shock: { off: 3, def: 3 }, moral: { off: 4, def: 4 }, name: "Drill Infantry" },
  { tech: 30, fire: { off: 4, def: 4 }, shock: { off: 4, def: 3 }, moral: { off: 3, def: 4 }, name: "Jaeger Infantry" },
  { tech: 30, fire: { off: 4, def: 3 }, shock: { off: 4, def: 3 }, moral: { off: 4, def: 4 }, name: "Mixed Order Infantry" },
  { tech: 30, fire: { off: 4, def: 4 }, shock: { off: 4, def: 3 }, moral: { off: 4, def: 3 }, name: "Napoleonic Square" },
];

export const getFirstUnitByTech = (tech: number, type: UnitType = "infantry"): Unit => {
  const availableUnits = westernInfrantryUnits.filter((unit) => unit.tech <= tech);
  const unit = availableUnits[availableUnits.length - 1];
  if (unit) {
    return unit;
  }
  throw new Error(`No unit for tech ${tech} found. Tech must be between 0 and 30`);
};

export const getFirstUnitByName = (unitName: string): Unit => {
  const unit = westernInfrantryUnits.find((unit) => unit.name === unitName);
  if (unit) {
    return unit;
  }
  throw new Error(`Unit ${unitName} not found`);
};
