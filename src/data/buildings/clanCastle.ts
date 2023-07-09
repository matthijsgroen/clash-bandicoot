import { buildingStore } from "../buildingStore";
import { time } from "../utils/time";

// https://clashofclans.fandom.com/wiki/Clan_Castle

const buildingLevels: [
  hitPoints: number,
  elixir: number,
  troopCapacity: number,
  time: string,
  th: number
][] = [
  [1_000, 10_000, 10, "0s", 2],
  [1_400, 100_000, 15, "8h", 4],
  [2_000, 800_000, 20, "12h", 6],
  [2_600, 1_200_000, 25, "1d", 8],
  [3_000, 2_500_000, 30, "2d", 9],
];

buildingLevels.forEach(([hitPoints, cost, capacity, timeStr, th], lvl) => {
  buildingStore.addBuilding({
    type: "clancastle",
    categories: ["resource"],
    level: 1 + lvl,
    size: [3, 3],
    thRequirement: th,
    hitPoints: hitPoints,
    cost: {
      type: "elixir",
      amount: cost,
      time: time(timeStr),
    },
    triggerRadius: 13,
    aiSettings: {
      capacity,
    },
  });
});

[[1, 1]].forEach(([amount, th]) =>
  buildingStore.setBuildingLimit("clancastle", amount, th)
);
