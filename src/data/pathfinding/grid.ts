import { BaseLayout, BattleBaseData } from "../types";
import { ObstacleGrid } from "./types";

export const createObstacleGrid = (
  layout: BaseLayout,
  baseInfo: BattleBaseData
): ObstacleGrid => {
  const grid = Array(layout.gridSize[0])
    .fill(0)
    .map(() => Array(layout.gridSize[1]).fill(0));

  for (const key in layout.items) {
    const building = layout.items[key];
    const [width, height] = building.info.size;
    const [posX, posY] = building.position;

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        if (
          x > 0 &&
          ((x < width - 1 && width > 2) || width <= 2) &&
          y > 0 &&
          ((y < height - 1 && height > 2) || height <= 2)
        ) {
          grid[posY + y][posX + x] = -1;
        }
      }
    }
  }

  return grid;
};
