import { troopStore } from "../troopStore";
import { time } from "../utils/time";

// https://clashofclans.fandom.com/wiki/Giant

const troopLevels: [
  hitPoints: number,
  researchTime: string,
  researchCost: number,
  damage: number,
  labLvl: number
][] = [
  [300, "0s", 0, 22, 0],
  [360, "4h", 40_000, 28, 2],
  [450, "8h", 150_000, 38, 4],
  [600, "12h", 500_000, 48, 5],
  [800, "1d", 1_200_000, 62, 6],
  [1100, "2d", 2_000_000, 86, 7],
  // [1300, "3d12h", 3_000_000, 110, 8],
  // [1500, "5d12h", 3_500_000, 124, 9],
];

troopLevels.forEach(
  ([hitPoints, researchTime, researchCost, damage, labLvl], lvl) => {
    troopStore.addTroop({
      type: "giant",
      level: 1 + lvl,
      category: "ground",
      attackSpeed: 2,
      size: 5,
      targetPreference: [{ category: "defense" }],
      barrackRequirement: 3,
      laboratoryRequirement: labLvl,
      hitPoints,
      hitRadius: 1,
      damage,
      trainingTime: time("30s"),
      aiType: "groundUnit",
      researchCost: {
        amount: researchCost,
        type: "elixir",
        time: time(researchTime),
      },
      movementSpeed: 12,
    });
  }
);
