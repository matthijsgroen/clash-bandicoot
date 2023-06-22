import { troopStore } from "../troopStore";
import { time } from "../time";

const troopLevels: [
  hitPoints: number,
  researchTime: string,
  researchCost: number,
  damage: number,
  labLvl: number
][] = [[45, "0s", 0, 8, 0]];

troopLevels.forEach(
  ([hitPoints, researchTime, researchCost, damage, labLvl], lvl) => {
    troopStore.addTroop({
      type: "barbarian",
      level: 1 + lvl,
      attackSpeed: 1,
      size: 1,
      targetPreference: [],
      barrackRequirement: 1,
      laboratoryRequirement: labLvl,
      hitPoints,
      hitRadius: 0.4,
      damage,
      trainingTime: time("5s"),
      aiType: "groundUnit",
      researchCost: {
        amount: researchCost,
        type: "elixir",
        time: time(researchTime),
      },
      movementSpeed: 16,
    });
  }
);
