import { troopStore } from "../troopStore";
import { time } from "../utils/time";

// https://clashofclans.fandom.com/wiki/Wall_Breaker

const troopLevels: [
  hitPoints: number,
  researchTime: string,
  researchCost: number,
  damage: number,
  damageWhenDestroyed: number,
  labLvl: number
][] = [
  [20, "0s", 0, 6, 6, 0],
  [24, "6h", 100_000, 10, 9, 2],
  [29, "12h", 250_000, 15, 13, 4],
  [35, "18h", 600_000, 20, 16, 5],
  [53, "1d", 1_200_000, 43, 23, 6],
  [72, "2d3h", 2_500_000, 55, 30, 7],
  // [82, "3d12h", 4_200_000, 66, 36, 8],
];

troopLevels.forEach(
  (
    [
      hitPoints,
      researchTime,
      researchCost,
      damage,
      damageWhenDestroyed,
      labLvl,
    ],
    lvl
  ) => {
    troopStore.addTroop({
      type: "wallbreaker",
      level: 1 + lvl,
      category: "ground",
      attackSpeed: 1,
      size: 2,
      targetPreference: [{ category: "wall", multiplier: 40 }],
      barrackRequirement: 5,
      laboratoryRequirement: labLvl,
      hitPoints,
      hitRadius: 1,
      damage,
      trainingTime: time("15s"),
      aiType: "wallBreaker",
      aiSettings: {
        damageWhenDestroyed,
        damageRadius: 2,
      },
      researchCost: {
        amount: researchCost,
        type: "elixir",
        time: time(researchTime),
      },
      movementSpeed: 24,
    });
  }
);
