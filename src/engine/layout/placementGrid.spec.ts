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
});
