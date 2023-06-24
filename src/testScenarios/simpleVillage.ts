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
    { timestamp: 5000, level: 1, unit: "barbarian", position: [12, 12] },
    { timestamp: 5050, level: 1, unit: "barbarian", position: [13.5, 12.5] },
    { timestamp: 5100, level: 1, unit: "barbarian", position: [15.5, 12] },
    { timestamp: 6500, level: 1, unit: "archer", position: [13.5, 8.5] },
    { timestamp: 20500, level: 1, unit: "archer", position: [27.5, 34.5] },
    { timestamp: 20700, level: 1, unit: "archer", position: [29, 34.5] },
    { timestamp: 20900, level: 1, unit: "archer", position: [31.5, 34.5] },
  ],
};
