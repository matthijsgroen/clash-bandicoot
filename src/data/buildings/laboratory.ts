import { buildingStore } from "../buildingStore";
import { time } from "../utils/time";

const buildingLevels: [
  hitPoints: number,
  gold: number,
  time: string,
  th: number
][] = [
  [500, 5_000, "1m", 3],
  [550, 25_000, "1h", 4],
  [600, 50_000, "2h", 5],
  [650, 100_000, "4h", 6],
  [700, 200_000, "8h", 7],
  [750, 400_000, "16h", 8],
  [830, 800_000, "1d", 9],
];

buildingLevels.forEach(([hitPoints, cost, timeStr, th], lvl) => {
  buildingStore.addBuilding({
    type: "laboratory",
    categories: ["army"],
    level: 1 + lvl,
    size: [3, 3],
    thRequirement: th,
    hitPoints: hitPoints,
    cost: {
      type: "elixir",
      amount: cost,
      time: time(timeStr),
    },
    aiSettings: {},
  });
});
