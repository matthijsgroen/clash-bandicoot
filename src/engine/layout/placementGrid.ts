import { createGrid } from "../pathfinding/grid";
import { BaseLayout } from "../types";

export type PlacementGrid = boolean[][];

export const createPlacementGrid = (layout: BaseLayout): PlacementGrid => {
  const grid = createGrid(layout.gridSize[0], layout.gridSize[1], true);
  return grid;
};
