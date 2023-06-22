import { Replay } from "../data/attack";
import { layoutBuilder } from "../data/baseLayout";

export const layout = layoutBuilder()
  .placeBuilding("townhall", 1, [17, 17])
  .placeBuilding("armycamp", 1, [10, 17])
  .placeBuilding("barracks", 1, [14, 17])
  .result();

export const replay: Replay = {
  placement: [
    { timestamp: 2000, level: 1, unit: "barbarian", position: [5, 17] },
  ],
};
