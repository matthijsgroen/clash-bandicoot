import { buildingStore } from "../buildingStore";
import { time } from "../utils/time";

const buildingLevels: [
  hitPoints: number,
  gold: number,
  time: string,
  damage: number,
  th: number
][] = [
  [620, 120_000, "3h", 14.3, 5],
  [650, 220_000, "8h", 16.9, 5],
  [680, 420_000, "12h", 20.8, 6],
  [730, 720_000, "18h", 26, 7],
  [840, 920_000, "1d", 31.2, 8],
  [960, 1_200_000, "1d12h", 41.6, 8],
  [1_200, 2_200_000, "2d", 52, 9],
];

buildingLevels.forEach(([hitPoints, cost, timeStr, damage, th], lvl) => {
  buildingStore.addBuilding({
    type: "wizardtower",
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
    triggerRadius: 7,
    triggerDeadZone: 0,
    // aiType: "mortar",
    aiSettings: {
      firingRate: 1.3,
      damage,
      unitGroup: "all",
      splash: 1,
    },
  });
});

[
  [1, 5],
  [2, 6],
  [3, 8],
  [4, 9],
].forEach(([amount, th]) =>
  buildingStore.setBuildingLimit("wizardtower", amount, th)
);
