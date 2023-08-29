import { troopStore } from "../troopStore";
import { time } from "../utils/time";

// https://clashofclans.fandom.com/wiki/Balloon

const troopLevels: [
  hitPoints: number,
  researchTime: string,
  researchCost: number,
  damage: number,
  damageWhenDestroyed: number,
  labLvl: number
][] = [
  [150, "0s", 0, 75, 25, 0],
  [180, "8h", 125_000, 96, 32, 2],
  [216, "12h", 400_000, 144, 48, 4],
  [280, "18h", 800_000, 216, 72, 5],
  [390, "1d", 1_500_000, 324, 108, 6],
  [545, "3d12h", 2_750_000, 486, 162, 7],
  // [690, "5d6h", 4_500_000, 594, 214, 9],
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
      type: "balloon",
      level: 1 + lvl,
      category: "air",
      attackSpeed: 3,
      size: 5,
      targetPreference: [{ category: "defense" }],
      barrackRequirement: 6,
      laboratoryRequirement: labLvl,
      hitPoints,
      hitRadius: 0.5,
      damage,
      trainingTime: time("30s"),
      aiType: "bomber",
      aiSettings: {
        damageWhenDestroyed,
        damageRadius: 1.2,
      },
      researchCost: {
        amount: researchCost,
        type: "elixir",
        time: time(researchTime),
      },
      movementSpeed: 10,
    });
  }
);
