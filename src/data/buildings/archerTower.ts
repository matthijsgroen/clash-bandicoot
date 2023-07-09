import { buildingStore } from "../buildingStore";
import { time } from "../utils/time";

// https://clashofclans.fandom.com/wiki/Archer_Tower/Home_Village

const buildingLevels: [
  hitPoints: number,
  gold: number,
  time: string,
  damage: number,
  th: number
][] = [
  [380, 1_000, "1m", 5.5, 2],
  [420, 2_000, "15m", 7.5, 2],
  [460, 5_000, "45m", 9.5, 3],
  [500, 20_000, "3h", 12.5, 4],
  [540, 80_000, "5h", 15, 5],
  [580, 180_000, "8h", 17.5, 5],
  [630, 360_000, "10h", 21, 6],
  [690, 600_000, "12h", 24, 7],
  [750, 800_000, "14h", 28, 8],
  [810, 1_000_000, "18h", 31.5, 8],
  [890, 1_200_000, "1d", 35, 9],
];

buildingLevels.forEach(([hitPoints, cost, timeStr, damage, th], lvl) => {
  buildingStore.addBuilding({
    type: "archertower",
    categories: ["defense"],
    level: 1 + lvl,
    size: [3, 3],
    thRequirement: th,
    hitPoints: hitPoints,
    cost: {
      type: "gold",
      amount: cost,
      time: time(timeStr),
    },
    triggerRadius: 10,
    aiType: "cannon",
    aiSettings: {
      firingRate: 0.5,
      damage,
      unitGroup: "all",
    },
  });
});

[
  [1, 2],
  [2, 4],
  [3, 5],
  [4, 7],
  [5, 8],
  [6, 9],
  [7, 10],
  [8, 11],
].forEach(([amount, th]) =>
  buildingStore.setBuildingLimit("archertower", amount, th)
);
