import { buildingStore } from "../buildingStore";
import { time } from "../utils/time";

const buildingLevels: [
  hitPoints: number,
  elixir: number,
  time: string,
  th: number
][] = [
  [425, 150_000, "8h", 5],
  [470, 300_000, "1d", 6],
  [520, 600_000, "2d", 7],
  [600, 1_200_000, "3d12h", 9],
];

buildingLevels.forEach(([hitPoints, cost, timeStr, th], lvl) => {
  buildingStore.addBuilding({
    type: "spellfactory",
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

[[1, 5]].forEach(([amount, th]) =>
  buildingStore.setBuildingLimit("spellfactory", amount, th)
);
