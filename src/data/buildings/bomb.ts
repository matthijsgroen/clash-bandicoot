import { buildingStore } from "../buildingStore";
import { time } from "../utils/time";

// https://clashofclans.fandom.com/wiki/Bomb

const buildingLevels: [
  damage: number,
  gold: number,
  time: string,
  th: number
][] = [
  [20, 400, "0s", 3],
  [24, 1_000, "6m", 3],
  [29, 10_000, "2h", 5],
  [35, 100_000, "8h", 7],
  [42, 300_000, "18h", 8],
  [54, 500_000, "1d12h", 9],
];

buildingLevels.forEach(([damage, cost, timeStr, th], lvl) => {
  buildingStore.addBuilding({
    type: "bomb",
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
    triggerRadius: 1.5,
    aiType: "bomb",
    aiSettings: {
      damage,
      unitGroup: "ground",
      splash: 3,
      firingRate: 1.5,
    },
  });
});

[
  [2, 3],
  [4, 5],
  [6, 7],
  [7, 13],
  [8, 14],
].forEach(([amount, th]) => buildingStore.setBuildingLimit("bomb", amount, th));
