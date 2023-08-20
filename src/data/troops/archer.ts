import { troopStore } from "../troopStore";
import { time } from "../utils/time";

// https://clashofclans.fandom.com/wiki/Archer

const troopLevels: [
  hitPoints: number,
  researchTime: string,
  researchCost: number,
  damage: number,
  labLvl: number
][] = [
  [20, "0s", 0, 7, 0],
  [23, "3h", 30_000, 9, 1],
  [28, "6h", 80_000, 12, 3],
  [33, "12h", 300_000, 16, 5],
  [40, "1d", 800_000, 20, 6],
  [44, "1d12h", 2_000_000, 20, 7],
];

troopLevels.forEach(
  ([hitPoints, researchTime, researchCost, damage, labLvl], lvl) => {
    troopStore.addTroop({
      type: "archer",
      level: 1 + lvl,
      category: "ground",
      attackSpeed: 1,
      size: 1,
      targetPreference: [],
      barrackRequirement: 2,
      laboratoryRequirement: labLvl,
      hitPoints,
      hitRadius: 3.5,
      damage,
      trainingTime: time("6s"),
      aiType: "groundUnit",
      researchCost: {
        amount: researchCost,
        type: "elixir",
        time: time(researchTime),
      },
      movementSpeed: 24,
    });
  }
);
