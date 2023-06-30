import { buildingStore } from "../buildingStore";
import { time } from "../utils/time";

// https://clashofclans.fandom.com/wiki/Wall/Home_Village

const buildingLevels: [hitPoints: number, gold: number, th: number][] = [
  [300, 50, 2],
  [500, 1_000, 2],
  [700, 5_000, 3],
  [900, 10_000, 4],
  [1400, 20_000, 5],
];

buildingLevels.forEach(([hitPoints, cost, th], lvl) => {
  buildingStore.addBuilding({
    type: "wall",
    categories: ["wall"],
    level: 1 + lvl,
    size: [1, 1],
    thRequirement: th,
    hitPoints: hitPoints,
    cost: {
      type: "elixir",
      amount: cost,
      time: 0,
    },
    aiSettings: {},
  });
});
