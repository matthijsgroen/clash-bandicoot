import { armyBuilder } from "../data/armyComposition";
import { layoutBuilder } from "../data/baseLayout";
import { Replay } from "../data/types";

export const village = layoutBuilder()
  .placeBuilding("townhall", 1, [17, 17])
  // .placeBuilding("armycamp", 1, [10, 17])
  // .placeBuilding("cannon", 1, [14, 14])
  // .placeBuilding("archertower", 1, [14, 20])
  // .placeBuilding("barracks", 1, [14, 17])
  // .placeBuilding("builderhut", 1, [34, 37])
  // .placeBuilding("builderhut", 1, [20, 2])
  .result();

export const army = armyBuilder()
  .addTroops("barbarian", 1, 4)
  .addTroops("archer", 1, 4)
  .addTroops("giant", 1, 2)
  .result();

export const replay: Replay = {
  placement: [
    { timestamp: 1000, level: 1, unit: "giant", position: [13.5, 8.5] },
    { timestamp: 1200, level: 1, unit: "giant", position: [12.5, 8.5] },
    { timestamp: 1300, level: 1, unit: "giant", position: [12.5, 25.5] },
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
