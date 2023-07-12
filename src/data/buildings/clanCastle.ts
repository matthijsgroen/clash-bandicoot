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

/**
 * Technically it could happen at TH 1, but there is no way the player can get enough resources to
 * restore it. Even on TH 2 the max resources is 8,500, and you need 10,000 to restore it.
 *
 * In special events, you can get a hammer to restore it, or get a restore cost reduction.
 *
 */
[[1, 2]].forEach(([amount, th]) =>
  buildingStore.setBuildingLimit("clancastle", amount, th)
);
