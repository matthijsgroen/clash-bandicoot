import { buildingStore } from "../buildingStore";
import { time } from "../utils/time";

// https://clashofclans.fandom.com/wiki/Elixir_Storage/Home_Village

const buildingLevels: [
  hitPoints: number,
  gold: number,
  time: string,
  th: number
][] = [
  [400, 300, "10s", 1],
  [600, 750, "5m", 2],
  [800, 1_500, "20m", 2],
  [1000, 3_000, "1h", 3],
  [1200, 6_000, "2h", 3],
  [1400, 12_000, "3h", 3],
  [1600, 25_000, "4h", 4],
  [1700, 50_000, "5h", 4],
  [1800, 100_000, "8h", 5],
  [1900, 250_000, "12h", 6],
  [2100, 500_000, "16h", 7],
];

buildingLevels.forEach(([hitPoints, cost, timeStr, th], lvl) => {
  buildingStore.addBuilding({
    type: "elixirstorage",
    categories: ["resource"],
    level: 1 + lvl,
    size: [3, 3],
    thRequirement: th,
    hitPoints: hitPoints,
    cost: {
      type: "gold",
      amount: cost,
      time: time(timeStr),
    },
    aiSettings: {},
  });
});
