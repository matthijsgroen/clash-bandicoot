import { buildingStore } from "../buildingStore";
import { time } from "../utils/time";

const buildingLevels: [
  hitPoints: number,
  gold: number,
  time: string,
  damage: number,
  th: number
][] = [
  [400, 5_000, "3h", 20, 3],
  [450, 25_000, "6h", 25, 4],
  [500, 100_000, "12h", 30, 5],
  [550, 200_000, "1d", 35, 6],
  [600, 400_000, "2d", 45, 7],
  [650, 750_000, "2d12h", 55, 8],
  [700, 1_500_000, "3h", 75, 9],
];

buildingLevels.forEach(([hitPoints, cost, timeStr, damage, th], lvl) => {
  buildingStore.addBuilding({
    type: "mortar",
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
    triggerRadius: 11,
    aiType: "mortar",
    aiSettings: {
      firingRate: 5,
      deadZone: 4,
      damage,
      unitGroup: "ground",
      splash: 1.5,
    },
  });
});

[
  [1, 3],
  [2, 6],
  [3, 7],
  [4, 8],
].forEach(([amount, th]) =>
  buildingStore.setBuildingLimit("mortar", amount, th)
);
