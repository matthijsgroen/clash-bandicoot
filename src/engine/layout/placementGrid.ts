import { createGrid } from "../utils/grid";
import { BaseLayout } from "../types";

export type PlacementGrid = boolean[][];

export const createPlacementGrid = (layout: BaseLayout): PlacementGrid => {
  const grid = createGrid(layout.gridSize[0], layout.gridSize[1], true);

  for (const building of Object.values(layout.items)) {
    const [posX, posY] = building.position;
    const [width, height] = building.info.size;
    for (let x = posX - 1; x < posX + width + 1; x++) {
      for (let y = posY - 1; y < posY + height + 1; y++) {
        grid[y][x] = false;
      }
    }
  }
  return grid;
};
