import { buildingStore } from "../buildingStore";
import { time } from "../utils/time";

// https://clashofclans.fandom.com/wiki/Giant_Bomb

const buildingLevels: [
  damage: number,
  gold: number,
  time: string,
  radius: number,
  th: number
][] = [
  [175, 12_500, "0s", 3, 6],
  [200, 75_000, "6m", 3.5, 6],
  [225, 600_000, "1d", 3.5, 8],
  [250, 2_000_000, "3d", 4, 10],
  [275, 2_500_000, "3d12h", 4, 11],
  [325, 3_000_000, "4d6h", 4, 13],
  [375, 4_200_000, "5d12h", 4, 13],
  [400, 8_500_000, "10d12h", 4, 14],
  [425, 10_500_000, "12d", 4, 15],
];

buildingLevels.forEach(([damage, cost, timeStr, radius, th], lvl) => {
  buildingStore.addBuilding({
    type: "giantbomb",
    categories: ["trap"],
    buildingColor: "#444",
    level: 1 + lvl,
    size: [2, 2],
    thRequirement: th,
    hitPoints: 1,
    cost: {
      type: "gold",
      amount: cost,
      time: time(timeStr),
    },
    triggerRadius: 2,
    aiType: "bomb",
    aiSettings: {
      damage,
      unitGroup: "ground",
      splash: radius,
      firingRate: 1.5,
    },
  });
});

[
  [1, 6],
  [2, 7],
  [3, 8],
  [4, 9],
  [5, 10],
  [6, 12],
  [7, 14],
].forEach(([amount, th]) =>
  buildingStore.setBuildingLimit("giantbomb", amount, th)
);
