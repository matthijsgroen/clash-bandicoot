import { buildingStore } from "../buildingStore";
import { time } from "../utils/time";

// https://clashofclans.fandom.com/wiki/Spring_Trap/Home_Village

const buildingLevels: [
  springCapacity: number,
  gold: number,
  time: string,
  th: number
][] = [
  [10, 2_000, "0s", 4],
  [12, 300_000, "12h", 7],
  [14, 500_000, "18h", 8],
  [16, 800_000, "1d12h", 9],
  // [18, 1_000_000, "3d", 10],
];

buildingLevels.forEach(([springCapacity, cost, timeStr, th], lvl) => {
  buildingStore.addBuilding({
    type: "springtrap",
    categories: ["trap"],
    level: 1 + lvl,
    size: [1, 1],
    thRequirement: th,
    hitPoints: 1,
    cost: {
      type: "gold",
      amount: cost,
      time: time(timeStr),
    },
    triggerRadius: 0.8,
    aiType: "springTrap",
    aiSettings: {
      springCapacity,
      unitGroup: "ground",
    },
  });
});

[
  [2, 4],
  [4, 6],
  [6, 8],
  [8, 12],
  [9, 13],
].forEach(([amount, th]) =>
  buildingStore.setBuildingLimit("springtrap", amount, th)
);
