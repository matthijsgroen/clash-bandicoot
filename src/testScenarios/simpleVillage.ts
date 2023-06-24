import { layoutBuilder } from "../data/baseLayout";
import { Replay } from "../data/types";

export const layout = layoutBuilder()
  .placeBuilding("townhall", 1, [17, 17])
  .placeBuilding("armycamp", 1, [10, 17])
  .placeBuilding("cannon", 1, [14, 14])
  .placeBuilding("barracks", 1, [14, 17])
  .placeBuilding("builderhut", 1, [34, 37])
  .placeBuilding("builderhut", 1, [20, 2])
  .result();

export const replay: Replay = {
  placement: [
    { timestamp: 2000, level: 1, unit: "barbarian", position: [5, 17] },
    { timestamp: 20500, level: 1, unit: "archer", position: [32, 25] },
    // { timestamp: 21500, level: 1, unit: "barbarian", position: [22, 25] },
  ],
};
