import inquirer from "inquirer";
import { battleDay, getRegimentFromPlayerModifiers } from "./calculation";
import { CurrentRegimentStrength, Unit } from "./interfaces";
import { westernInfrantryUnits } from "./testValues";

// log objects with inifinte depth
require("util").inspect.defaultOptions.depth = null;

const compareWesternInfrantry = () => {
  const unitsByTech: Record<number, Unit[]> = {};

  for (let i = 0; i < westernInfrantryUnits.length; i++) {
    const unit = westernInfrantryUnits[i];

    if (unitsByTech[unit.tech]) {
      unitsByTech[unit.tech].push(unit);
    } else {
      unitsByTech[unit.tech] = [unit];
    }
  }

  // not used
  const sortedUnitsByTech = Object.entries(unitsByTech).map(([tech, units]) => {
    const sortedUnits = units
      .sort((unit1, unit2) => {
        const regiment1 = getRegimentFromPlayerModifiers({ tech: parseInt(tech), unit: unit1 });
        const regiment2 = getRegimentFromPlayerModifiers({ tech: parseInt(tech), unit: unit2 });
        const { winner } = battleDay(regiment1, regiment2, 1, "fire", false);
        return winner === "regiment1" ? -1 : 1;
      })
      .map((unit) => unit.name);

    return { tech, sortedUnits };
  });

  const sortedUnitsWithRating = Object.entries(unitsByTech).map(([tech, units]) => {
    const unitsWithResults: Record<string, { name: string; averageRemaining: { moral: number; troops: number } }> = {};

    const addToUnitsWithResults = (name: string, { moral, troops }: CurrentRegimentStrength) => {
      if (!unitsWithResults[name]) {
        unitsWithResults[name] = { name, averageRemaining: { moral: moral / fightsPerUnit, troops: troops / fightsPerUnit } };
      } else {
        unitsWithResults[name].averageRemaining.moral += moral / fightsPerUnit;
        unitsWithResults[name].averageRemaining.troops += troops / fightsPerUnit;
      }
    };

    const fightsPerUnit = units.length - 1;
    for (let i = 0; i < units.length; i++) {
      const unit = units[i];

      let j = i + 1;
      let nextUnit = units[j];
      while (nextUnit) {
        const regiment1 = getRegimentFromPlayerModifiers({ tech: parseInt(tech), unit });
        const regiment2 = getRegimentFromPlayerModifiers({ tech: parseInt(tech), unit: nextUnit });
        const result = battleDay(regiment1, regiment2, 1, "fire", false);
        console.log(`Tech ${tech}: ${unit.name} vs ${nextUnit.name}`, result);

        addToUnitsWithResults(unit.name, result.regiment1Remaining);
        addToUnitsWithResults(nextUnit.name, result.regiment2Remaining);

        j++;
        nextUnit = units[j];
      }
    }

    const sortedUnitsWithResults = Object.values(unitsWithResults)
      .map((unit) => {
        unit.averageRemaining.moral = parseFloat(unit.averageRemaining.moral.toFixed(2));
        unit.averageRemaining.troops = parseFloat(unit.averageRemaining.troops.toFixed(0));
        return unit;
      })
      .sort((a, b) => b.averageRemaining.moral - a.averageRemaining.moral);

    return [tech, sortedUnitsWithResults];
  });

  const sortedUnitsByTechGroup = Object.fromEntries(sortedUnitsWithRating);

  console.log(sortedUnitsByTechGroup);
};

const exit = () => {
  console.log("Bye...");
  process.exit(0);
};

const prompt = async (): Promise<void> => {
  const { action } = await inquirer.prompt({
    type: "list",
    name: "action",
    message: "What do you want to do?",
    choices: [
      { name: "Run default test tech 10", value: "default" },
      { name: "Compare all western infantry", value: "compareWester" },
      { name: "Your user defined compare", value: "customCompare" },
      { name: "Quit", value: "exit" },
    ],
  });

  let player1 = getRegimentFromPlayerModifiers({});
  let player2 = getRegimentFromPlayerModifiers({});

  switch (action) {
    case "default":
      battleDay(player1, player2);
      break;
    case "compareWester":
      compareWesternInfrantry();
      break;
    case "customCompare":
      player1 = getRegimentFromPlayerModifiers({ tech: 25, discipline: 1.05, moralBonus: 0, generalPips: { fire: 1, shock: 1 } }); // offensive
      player2 = getRegimentFromPlayerModifiers({ tech: 4, discipline: 1.05, moralBonus: 0, unitCombatAbility: { infantry: 0.1, cavalry: 0.1, artillery: 0.1 } }); // quality
      const player3 = getRegimentFromPlayerModifiers({ tech: 25, discipline: 1, moralBonus: 0.15 }); // defensive
      // player2 = getRegimentFromPlayerModifiers({ moralBonus: 0.15, damangeModifiers: { shock: { dealt: 0.01, received: 0 }, fire: { dealt: 0, received: 0 } } });
      // player1 = getRegimentFromPlayerModifiers({ discipline: 1.05 });
      // player2 = getRegimentFromPlayerModifiers({ moralBonus: 0.1 });

      // battleDay(player1, player2);
      // battleDay(player2, player3);
      battleDay(player1, player3);
      break;
    case "exit":
      exit();
      break;
  }
};

prompt();
