import { buildingStore } from "../buildingStore";

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

[
  [25, 2],
  [50, 3],
  [75, 4],
  [100, 5],
  [125, 6],
  [175, 7],
  [225, 8],
  [250, 9],
  [275, 10],
  [300, 11],
  [325, 14],
].forEach(([amount, th]) => buildingStore.setBuildingLimit("wall", amount, th));
