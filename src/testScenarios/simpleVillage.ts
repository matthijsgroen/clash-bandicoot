import { layoutBuilder } from "../data/baseLayout";

export const layout = layoutBuilder()
  .placeBuilding("townhall", 1, [17, 17])
  .placeBuilding("armycamp", 1, [10, 17])
  .placeBuilding("barracks", 1, [14, 17])
  .result();
