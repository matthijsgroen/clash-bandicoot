import { armyBuilder } from "../data/armyComposition";
import { layoutBuilder } from "../data/baseLayout";
import { Replay } from "../data/types";

const builder = layoutBuilder()
  .placeBuilding("townhall", 1, [18, 20])
  .placeBuilding("archertower", 1, [15, 20])
  .placeBuilding("cannon", 1, [18, 24])
  .placeBuilding("cannon", 1, [22, 18])
  .placeBuilding("archertower", 1, [22, 25])
  .placeBuilding("elixirstorage", 4, [15, 17])
  .placeBuilding("elixirstorage", 4, [19, 14])
  .placeBuilding("builderhut", 1, [21, 11])
  .placeBuilding("builderhut", 1, [29, 27])
  .placeBuilding("barracks", 1, [23, 11])
  .placeBuilding("barracks", 1, [11, 13])
  .placeBuilding("barracks", 1, [29, 21])
  .placeBuilding("armycamp", 1, [26, 16])
  .placeBuilding("armycamp", 1, [12, 28])
  .placeBuilding("goldstorage", 4, [14, 24])
  .placeBuilding("goldstorage", 4, [26, 24])
  .placeBuilding("goldmine", 4, [22, 15])
  .placeBuilding("goldmine", 4, [26, 27])
  .placeBuilding("goldmine", 4, [23, 29])
  .placeBuilding("goldmine", 4, [20, 29])
  .placeBuilding("goldmine", 4, [26, 21])
  .placeBuilding("elixircollector", 4, [29, 24])
  .placeBuilding("elixircollector", 4, [17, 28])
  .placeBuilding("elixircollector", 4, [12, 20])
  .placeBuilding("elixircollector", 4, [12, 17])
  .placeBuilding("elixircollector", 4, [15, 14])
  .placeBuilding("mortar", 1, [22, 21])
  .placeBuilding("laboratory", 1, [9, 24])
  .placeBuilding("airdefense", 1, [19, 17]);

const walls: [x: number, y: number][] = [];

const setWalls = (
  start: number,
  end: number,
  placer: (x: number) => [x: number, y: number]
) => {
  for (let x = start; x <= end; x++) {
    const coord = placer(x);
    walls.push(coord);
  }
};

setWalls(21, 25, (x) => [x, 24]);
setWalls(25, 27, (x) => [25, x]);
setWalls(21, 25, (x) => [x, 28]);
setWalls(25, 26, (x) => [21, x]);
setWalls(13, 21, (x) => [x, 27]);
setWalls(24, 26, (x) => [17, x]);
setWalls(24, 26, (x) => [13, x]);
setWalls(11, 16, (x) => [x, 23]);
setWalls(16, 22, (x) => [11, x]);
setWalls(14, 19, (x) => [18, x]);
setWalls(14, 22, (x) => [x, 13]);
setWalls(22, 25, (x) => [x, 14]);
setWalls(15, 24, (x) => [25, x]);
setWalls(12, 14, (x) => [x, 16]);
setWalls(14, 15, (x) => [14, x]);

walls.forEach((coordinate) => {
  builder.placeBuilding("wall", 4, coordinate);
});

export const village = builder.result();

export const army = armyBuilder()
  .addTroops("giant", 2, 1)
  .addTroops("goblin", 2, 1)
  .result();

export const replay: Replay = {
  placement: [
    { timestamp: 1000, level: 2, unit: "giant", position: [7.5, 18.5] },
    { timestamp: 1020, level: 2, unit: "goblin", position: [7.5, 20.5] },
  ],
};
