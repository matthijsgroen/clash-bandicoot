import { createObstacleGrid } from "./obstacleGrid";
import { layoutBuilder } from "../layout/baseLayout";
import { createInitialBaseData } from "../combat/attack";

describe("createObstacleGrid", () => {
  it("returns a 2 dimensional matching grid", () => {
    const layout = layoutBuilder(5, 5).result();

    const gridResult = createObstacleGrid(layout, {});
    expect(gridResult).toEqual([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
  });

  describe("2x2 buildings", () => {
    it("occupies a single block for units to walk along", () => {
      const layout = layoutBuilder(5, 5)
        .placeBuilding("builderhut", 1, [0, 0])
        .result();

      const gridResult = createObstacleGrid(
        layout,
        createInitialBaseData(layout)
      );
      expect(gridResult).toEqual([
        [0, 0, 0, 0, 0],
        [0, -1, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ]);
    });
  });

  describe("3x3 buildings", () => {
    it("occupies a single block for units to walk along", () => {
      const layout = layoutBuilder(5, 5)
        .placeBuilding("cannon", 1, [0, 0])
        .result();

      const gridResult = createObstacleGrid(
        layout,
        createInitialBaseData(layout)
      );
      expect(gridResult).toEqual([
        [0, 0, 0, 0, 0],
        [0, -1, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ]);
    });
  });

  describe("4x4 buildings", () => {
    it("occupies the middle blocks for units to walk along", () => {
      const layout = layoutBuilder(5, 5)
        .placeBuilding("armycamp", 1, [0, 0])
        .result();

      const gridResult = createObstacleGrid(
        layout,
        createInitialBaseData(layout)
      );
      expect(gridResult).toEqual([
        [0, 0, 0, 0, 0],
        [0, -1, -1, 0, 0],
        [0, -1, -1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ]);
    });
  });
});
