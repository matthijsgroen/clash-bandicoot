import { BaseLayout, BattleBaseData } from "../types";
import { createGrid } from "../utils/grid";
import { ObstacleGrid } from "./types";

export const createObstacleGrid = (
  layout: BaseLayout,
  baseInfo: BattleBaseData,
  paddingX = 0,
  paddingY = 0
): ObstacleGrid => {
  const grid = createGrid(
    layout.gridSize[0] + paddingX + paddingX,
    layout.gridSize[1] + paddingY + paddingY,
    0
  );

  for (const key in layout.items) {
    const building = layout.items[key];
    const [width, height] = building.info.size;
    const [posX, posY] = building.position;
    const hitPoints = baseInfo[key].hitPoints;
    if (hitPoints <= 0) continue;

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        if (
          x > 0 &&
          ((x < width - 1 && width > 2) || width <= 2) &&
          y > 0 &&
          ((y < height - 1 && height > 2) || height <= 2)
        ) {
          grid[posY + y + paddingY][posX + x + paddingX] = -1;
        }
        if (building.info.type === "wall") {
          grid[posY + y + paddingY][posX + x + paddingX] = hitPoints / 50;
        }
      }
    }
  }

  return grid;
};
