import { buildingStore } from "../buildingStore";
import { time } from "../utils/time";

// https://clashofclans.fandom.com/wiki/Elixir_Collector/Home_Village

const buildingLevels: [
  hitPoints: number,
  gold: number,
  time: string,
  th: number
][] = [
  [400, 150, "10s", 1],
  [440, 300, "1m", 1],
  [480, 700, "4m", 2],
  [520, 1_400, "10m", 2],
  [560, 3_000, "40m", 3],
  [600, 7_000, "3h", 3],
  [640, 14_000, "6h", 4],
  [680, 28_000, "8h", 4],
  [720, 56_000, "10h", 5],
  [780, 75_000, "12h", 5],
  [860, 100_000, "16h", 7],
  [960, 200_000, "20h", 8],
];

buildingLevels.forEach(([hitPoints, cost, timeStr, th], lvl) => {
  buildingStore.addBuilding({
    type: "elixircollector",
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

[
  [1, 1],
  [2, 2],
  [3, 3],
  [4, 4],
  [5, 5],
  [6, 6],
  [7, 9],
].forEach(([amount, th]) =>
  buildingStore.setBuildingLimit("elixircollector", amount, th)
);
