import { buildingStore } from "../buildingStore";
import { time } from "../utils/time";

const buildingLevels: [
  hitPoints: number,
  gold: number,
  time: string,
  damage: number,
  th: number
][] = [
  [420, 250, "10s", 7.2, 1],
  [470, 1_000, "2m", 8.8, 1],
  [520, 4_000, "10m", 12, 2],
  [570, 16_000, "45m", 15.2, 3],
  [620, 50_000, "2h", 20, 4],
  [670, 100_000, "4h", 24.8, 5],
  [730, 200_000, "8h", 32, 6],
  [800, 300_000, "10h", 38.4, 7],
  [880, 500_000, "12h", 44.8, 8],
  [960, 700_000, "18h", 51.2, 8],
  [1_060, 1_000_000, "1d", 59.2, 9],
];

buildingLevels.forEach(([hitPoints, cost, timeStr, damage, th], lvl) => {
  buildingStore.addBuilding({
    type: "cannon",
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
    triggerRadius: 9,
    // aiType: "cannon",
    aiSettings: {
      firingRate: 0.8,
      damage,
      unitGroup: "ground",
    },
  });
});
