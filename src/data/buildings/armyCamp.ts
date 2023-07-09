import { buildingStore } from "../buildingStore";
import { time } from "../utils/time";

const buildingLevels: [
  hitPoints: number,
  elixir: number,
  time: string,
  capacity: number,
  th: number
][] = [
  [250, 200, "5m", 20, 1],
  [270, 2_000, "15m", 30, 2],
  [290, 10_000, "2h", 35, 3],
  [310, 100_000, "5h", 40, 4],
  [330, 250_000, "8h", 45, 5],
  [350, 750_000, "12h", 50, 6],
  [400, 1_500_000, "2d", 55, 9],
];

buildingLevels.forEach(([hitPoints, cost, timeStr, capacity, th], lvl) => {
  buildingStore.addBuilding({
    type: "armycamp",
    categories: ["army"],
    level: 1 + lvl,
    size: [4, 4],
    thRequirement: th,
    hitPoints: hitPoints,
    cost: {
      type: "elixir",
      amount: cost,
      time: time(timeStr),
    },
    aiSettings: {
      capacity,
    },
  });
});

[
  [1, 1],
  [2, 3],
  [3, 5],
  [4, 7],
].forEach(([amount, th]) =>
  buildingStore.setBuildingLimit("armycamp", amount, th)
);
