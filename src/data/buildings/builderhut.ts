import { buildingStore } from "../buildingStore";

buildingStore.addBuilding({
  type: "builderhut",
  category: "other",
  level: 1,
  thRequirement: 1,
  size: [2, 2],
  hitPoints: 250,
  cost: {
    type: "gems",
    amount: 0,
    time: 0,
  },
});
