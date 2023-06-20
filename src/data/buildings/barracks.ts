import { buildingStore } from "../buildingStore";
import { time } from "../time";

const buildingLevels: [
  hitPoints: number,
  elixir: number,
  time: string,
  th: number
][] = [
  [250, 100, "10s", 1],
  [290, 500, "2m", 1],
  [330, 2_500, "10m", 1],
  [370, 5_000, "1h", 2],
  [420, 20_000, "8h", 3],
  [470, 120_000, "12h", 4],
  [520, 270_000, "18h", 5],
  [580, 800_000, "1d", 6],
  [650, 1_200_000, "1d12h", 7],
  [730, 1_700_000, "2d12h", 8],
  [810, 2_600_000, "4d", 9],
];

buildingLevels.forEach(([hitPoints, cost, timeStr, th], lvl) => {
  buildingStore.addBuilding({
    type: "barracks",
    category: "army",
    level: 1 + lvl,
    size: [3, 3],
    thRequirement: th,
    hitPoints: hitPoints,
    cost: {
      gold: 0,
      elixir: cost,
      darkElixir: 0,
      time: time(timeStr),
    },
  });
});
