import { troopStore } from "../troopStore";
import { time } from "../utils/time";

// https://clashofclans.fandom.com/wiki/Goblin

const troopLevels: [
  hitPoints: number,
  researchTime: string,
  researchCost: number,
  damage: number,
  labLvl: number
][] = [
  [25, "0s", 0, 22, 0],
  [30, "5h", 40_000, 28, 1],
  [36, "9h", 150_000, 38, 3],
  [50, "12h", 500_000, 48, 5],
  [65, "1d", 1_200_000, 62, 6],
  [80, "1d12h", 2_000_000, 86, 7],
  [105, "3d12h", 3_000_000, 110, 8],
];

troopLevels.forEach(
  ([hitPoints, researchTime, researchCost, damage, labLvl], lvl) => {
    troopStore.addTroop({
      type: "goblin",
      level: 1 + lvl,
      category: "ground",
      attackSpeed: 1,
      size: 1,
      targetPreference: [{ category: "resource", multiplier: 2 }],
      barrackRequirement: 4,
      laboratoryRequirement: labLvl,
      hitPoints,
      hitRadius: 0.4,
      damage,
      trainingTime: time("7s"),
      aiType: "groundUnit",
      researchCost: {
        amount: researchCost,
        type: "elixir",
        time: time(researchTime),
      },
      movementSpeed: 32,
    });
  }
);
