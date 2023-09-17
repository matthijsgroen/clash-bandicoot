import { buildingStore } from "../buildingStore";
import { time } from "../utils/time";

const buildingLevels: [
  hitPoints: number,
  gold: number,
  time: string,
  damage: number,
  th: number
][] = [
  [800, 22_000, "3h", 80, 4],
  [850, 90_000, "12h", 110, 4],
  [900, 270_000, "16h", 140, 5],
  [950, 500_000, "1d", 160, 6],
  [1_000, 1_000_000, "1d12h", 190, 7],
  [1_050, 1_350_000, "2d", 230, 8],
  [1_100, 1_750_000, "3d", 280, 9],
];

buildingLevels.forEach(([hitPoints, cost, timeStr, damage, th], lvl) => {
  buildingStore.addBuilding({
    type: "airdefense",
    categories: ["defense", "air-defense"],
    buildingColor: "#ffaaaa",
    level: 1 + lvl,
    size: [3, 3],
    thRequirement: th,
    hitPoints: hitPoints,
    cost: {
      type: "gold",
      amount: cost,
      time: time(timeStr),
    },
    triggerRadius: 10,
    aiType: "cannon",
    aiSettings: {
      firingRate: 1,
      damage,
      unitGroup: "air",
    },
  });
});

[
  [1, 4],
  [2, 6],
  [3, 7],
  [4, 9],
].forEach(([amount, th]) =>
  buildingStore.setBuildingLimit("airdefense", amount, th)
);
