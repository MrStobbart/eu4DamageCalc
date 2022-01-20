import { getFirstUnitByName } from "../testValues";
import { baseModifiers, calculateCasualitiesMultiplier, calculateMoralCasualities, calculateRelativePips, calculateStrengthCasualities, getRegimentFromPlayerModifiers } from "../calculation";

describe("calculateRelativePips", () => {
  it("calculates the relative pips correctly", () => {
    expect(calculateRelativePips(baseModifiers, baseModifiers, "shock", true)).toBe(1);
    expect(calculateRelativePips(baseModifiers, baseModifiers, "shock", false)).toBe(2);
    expect(calculateRelativePips(baseModifiers, baseModifiers, "fire", false)).toBe(0);
  });

  it("calculates the relative general pips correctly", () => {
    const player1 = { ...baseModifiers, generalPips: { shock: 2, fire: 1 } };
    const player2 = { ...baseModifiers, generalPips: { shock: 0, fire: 3 } };

    expect(calculateRelativePips(player1, player2, "shock", false)).toBe(4);
    expect(calculateRelativePips(player1, player2, "fire", false)).toBe(0);
    expect(calculateRelativePips(player2, player1, "fire", false)).toBe(2);
    expect(calculateRelativePips(player2, player1, "shock", false)).toBe(2);
  });
});

describe("calculateCasualitiesMultiplier", () => {
  it("calculates the correct multiplier", () => {
    const player1 = getRegimentFromPlayerModifiers({});
    const player2 = getRegimentFromPlayerModifiers({});

    expect(calculateCasualitiesMultiplier(player1, player2, 1, "fire")).toBe(0.5386666666666666);
    expect(calculateCasualitiesMultiplier(player1, player2, 1, "shock")).toBe(0.6396666666666666);
  });
});

describe("calculateMoralCasualities", () => {
  it("calculates the correct multiplier", () => {
    const player1 = getRegimentFromPlayerModifiers({});
    const player2 = getRegimentFromPlayerModifiers({});
    const multiplier = calculateCasualitiesMultiplier(player1, player2, 1, "fire");

    expect(calculateMoralCasualities(multiplier, player1, player2, "fire")).toBe(0.15718518518518518);
  });
});

describe("calculateStrengthCasualities", () => {
  it("calculates the correct multiplier", () => {
    const player1 = getRegimentFromPlayerModifiers({});
    const player2 = getRegimentFromPlayerModifiers({});

    const multiplierFire = calculateCasualitiesMultiplier(player1, player2, 1, "fire");
    expect(calculateStrengthCasualities(multiplierFire, player1, player2, "fire")).toBe(20.2);

    const multiplierShock = calculateCasualitiesMultiplier(player1, player2, 1, "shock");
    expect(calculateStrengthCasualities(multiplierShock, player1, player2, "shock")).toBe(30.384166666666665);
  });
});

describe("getRegimentFromPlayerModifiers", () => {
  it("has the correct default regiment", () => {
    expect(getRegimentFromPlayerModifiers({})).toMatchSnapshot();
  });
  it("sets the unit according to tech", () => {
    const regiment = getRegimentFromPlayerModifiers({ tech: 20 });
    expect(regiment.unit.name).toBe("Reformed Tercio");
    expect(regiment).toMatchSnapshot();
  });
  it("accepts custom units", () => {
    expect(getRegimentFromPlayerModifiers({ tech: 25, unit: getFirstUnitByName("Reformed Tercio") })).toMatchSnapshot();
  });
});
