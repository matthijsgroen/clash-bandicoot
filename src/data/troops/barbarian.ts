import { troopStore } from "../troopStore";
import { time } from "../utils/time";

// https://clashofclans.fandom.com/wiki/Barbarian/Home_Village

const troopLevels: [
  hitPoints: number,
  researchTime: string,
  researchCost: number,
  damage: number,
  labLvl: number
][] = [
  [45, "0s", 0, 8, 0],
  [54, "2h", 20_000, 11, 1],
  [65, "5h", 60_000, 14, 3],
  [85, "12h", 200_000, 18, 5],
];

troopLevels.forEach(
  ([hitPoints, researchTime, researchCost, damage, labLvl], lvl) => {
    troopStore.addTroop({
      type: "barbarian",
      level: 1 + lvl,
      category: "ground",
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
