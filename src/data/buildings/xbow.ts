import { buildingStore } from "../buildingStore";
import { time } from "../utils/time";

// https://clashofclans.fandom.com/wiki/X-Bow/Home_Village

const buildingLevels: [
  hitPoints: number,
  gold: number,
  time: string,
  damage: number,
  th: number
][] = [
  [1_500, 1_000_000, "2d", 7.68, 9],
  [1_900, 1_600_000, "4d", 8.96, 9],
  [2_300, 2_400_000, "5d", 10.24, 9],
  [2_700, 3_400_000, "5d6h", 12.16, 10],
  [3_100, 4_900_000, "6d6h", 16, 11],
  [3_500, 6_800_000, "9d", 19.2, 12],
  [3_900, 8_300_000, "9d12h", 21.76, 13],
  [4_200, 10_300_000, "10d", 23.68, 13],
  [4_500, 17_400_000, "18d", 25.6, 14],
  [4_700, 20_000_000, "19d", 27.52, 15],
];

buildingLevels.forEach(([hitPoints, cost, timeStr, damage, th], lvl) => {
  buildingStore.addBuilding({
    type: "xbow",
    categories: ["defense"],
    displayName: "X-Bow",
    buildingColor: "#ffaaaa",
    editActions: [
      {
        icon: "🎯",
        label: "Ground",
        mutation: {
          mutationType: "changeType",
          newType: "xbow:both",
        },
      },
    ],
    level: 1 + lvl,
    size: [3, 3],
    thRequirement: th,
    hitPoints: hitPoints,
    cost: {
      type: "gold",
      amount: cost,
      time: time(timeStr),
    },
    triggerRadius: 14,
    aiType: "cannon",
    aiSettings: {
      firingRate: 0.128,
      damage,
      unitGroup: "ground",
    },
  });

  buildingStore.addBuilding({
    type: "xbow:both",
    categories: ["defense"],
    displayName: "X-Bow",
    buildingColor: "#ffaaaa",
    editActions: [
      {
        icon: "🎯",
        label: "Air & Ground",
        mutation: {
          mutationType: "changeType",
          newType: "xbow",
        },
      },
    ],
    level: 1 + lvl,
    size: [3, 3],
    thRequirement: th,
    hitPoints: hitPoints,
    cost: {
      type: "gold",
      amount: cost,
      time: time(timeStr),
    },
    triggerRadius: 11.5,
    aiType: "cannon",
    aiSettings: {
      firingRate: 0.128,
      damage,
      unitGroup: "all",
    },
  });
});

[
  [2, 9],
  [3, 10],
  [4, 11],
].forEach(([amount, th]) => buildingStore.setBuildingLimit("xbow", amount, th));
