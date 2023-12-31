import { buildingStore } from "../buildingStore";
import { MAX_TOWNHALL } from "../consts";
import { time } from "../utils/time";

const buildingLevels: [hitPoints: number, gold: number, time: string][] = [
  [450, 0, "0s"],
  [1_600, 1_000, "10s"],
  [1_850, 4_000, "1h"],
  [2_100, 25_000, "3h"],
  [2_400, 150_000, "6h"],
  [2_800, 750_000, "12h"],
  [3_300, 1_000_000, "18h"],
  [3_900, 2_000_000, "1d"],
  [4_600, 3_000_000, "2d"],
  [5_500, 3_500_000, "2d12h"],
  [6_800, 4_000_000, "2d18h"],
  [7_500, 6_000_000, "4d6h"],
  [8_200, 9_000_000, "7d12h"],
  [8_900, 15_000_000, "13d6h"],
  [9_600, 18_000_000, "15d"],
];

buildingLevels
  .slice(0, MAX_TOWNHALL)
  .forEach(([hitPoints, cost, timeStr], lvl) => {
    buildingStore.addBuilding({
      type: "townhall",
      categories: ["resource"],
      buildingColor: "#90ff90",
      level: 1 + lvl,
      thRequirement: lvl,
      size: [4, 4],
      hitPoints: hitPoints,
      cost: {
        type: "gold",
        amount: cost,
        time: time(timeStr),
      },
      aiSettings: {},
    });
  });

[[1, 1]].forEach(([amount, th]) =>
  buildingStore.setBuildingLimit("townhall", amount, th)
);
