import { layoutBuilder } from "./baseLayout";
import { createPlacementGrid } from "./placementGrid";

describe("createPlacementGrid", () => {
  describe("with an empty grid", () => {
    it("returns all true", () => {
      const emptyLayout = layoutBuilder(5, 5).result();

      const grid = createPlacementGrid(emptyLayout);
      expect(grid[0][0]).toBe(true);

      const allTrue = grid.every((column) =>
        column.every((cell) => cell === true)
      );
      expect(allTrue).toBe(true);
    });
  });

  describe("with a single building grid", () => {
    it("returns true out of range in building", () => {
      const layout = layoutBuilder(10, 10)
        .placeBuilding("townhall", 1, [2, 2])
        .result();

      const grid = createPlacementGrid(layout);
      expect(grid[0][0]).toBe(true);
    });

    it("returns false just out of range of building", () => {
      const layout = layoutBuilder(10, 10)
        .placeBuilding("townhall", 1, [2, 2])
        .result();

      const grid = createPlacementGrid(layout);
      expect(grid[1][1]).toBe(false);
    });

    it("returns false on top of building", () => {
      const layout = layoutBuilder(10, 10)
        .placeBuilding("townhall", 1, [2, 2])
        .result();

      const grid = createPlacementGrid(layout);
      expect(grid[3][3]).toBe(false);
    });
  });
});
