import { troopStore } from "../troopStore";
import { time } from "../utils/time";

// https://clashofclans.fandom.com/wiki/P.E.K.K.A

const troopLevels: [
  hitPoints: number,
  researchTime: string,
  researchCost: number,
  damage: number,
  labLvl: number
][] = [
  [3_000, "0s", 0, 468, 0],
  [3_500, "12h", 1_200_000, 522, 6],
  [4_000, "1d", 1_800_000, 576, 6],
  [4_500, "2d", 2_800_000, 648, 7],
  [5_000, "3d12h", 3_200_000, 738, 8],
  [5_500, "4d18h", 4_200_000, 846, 8],
  [5_900, "6d", 5_200_000, 972, 9],
  [6_300, "9d", 7_000_000, 1_098, 10],
  [6_700, "10d", 8_500_000, 1_224, 11],
  [7_200, "16d", 18_000_000, 1_350, 13],
];

troopLevels.forEach(
  ([hitPoints, researchTime, researchCost, damage, labLvl], lvl) => {
    troopStore.addTroop({
      type: "pekka",
      level: 1 + lvl,
      category: "ground",
      attackSpeed: 1.8,
      size: 25,
      targetPreference: [],
      barrackRequirement: 10,
      laboratoryRequirement: labLvl,
      hitPoints,
      hitRadius: 0.8,
      damage,
      trainingTime: time("3m"),
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
