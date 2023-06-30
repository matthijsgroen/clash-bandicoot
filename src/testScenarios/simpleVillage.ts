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

walls.forEach((coordinate) => {
  builder.placeBuilding("wall", 4, coordinate);
});

export const village = builder.result();

export const army = armyBuilder()
  .addTroops("barbarian", 1, 4)
  .addTroops("archer", 1, 4)
  .addTroops("giant", 1, 2)
  .result();

export const replay: Replay = {
  placement: [
    { timestamp: 1000, level: 1, unit: "giant", position: [13.5, 8.5] },
    // { timestamp: 1200, level: 1, unit: "giant", position: [12.5, 8.5] },
    // { timestamp: 1300, level: 1, unit: "giant", position: [12.5, 25.5] },
    // { timestamp: 2000, level: 1, unit: "barbarian", position: [5, 17] },
    // { timestamp: 5000, level: 1, unit: "barbarian", position: [12, 12] },
    // { timestamp: 5050, level: 1, unit: "barbarian", position: [13.5, 12.5] },
    // { timestamp: 5100, level: 1, unit: "barbarian", position: [15.5, 12] },
    // { timestamp: 6500, level: 1, unit: "archer", position: [13.5, 8.5] },
    // { timestamp: 20500, level: 1, unit: "archer", position: [27.5, 34.5] },
    // { timestamp: 20700, level: 1, unit: "archer", position: [29, 34.5] },
    // { timestamp: 20900, level: 1, unit: "archer", position: [31.5, 34.5] },
  ],
};
