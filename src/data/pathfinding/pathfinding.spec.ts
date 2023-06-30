import { createGraph } from "./graph";
import { findPath } from "./pathfinding";
import { ObstacleGrid } from "./types";

describe("findPath", () => {
  describe("with clean grid", () => {
    const grid: ObstacleGrid = [
      [100, 0, 0, 0, 0],
      [0, -1, -1, -1, -1],
      [0, -1, 0, 0, 0],
      [0, 40, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];

    it("closes the start position", () => {
      const graph = createGraph(grid);

      const result = findPath(
        graph,
        [3, 0],
        (pos) => pos[0] === 3 && pos[1] === 3
      );

      expect(result).toBeUndefined();

      const startNode = graph.get(3, 0);
      expect(startNode?.closed).toBe(true);
    });

    it("opens the walkable start positions neighbors", () => {
      const graph = createGraph(grid);

      const result = findPath(
        graph,
        [3, 0],
        (pos) => pos[0] === 3 && pos[1] === 3
      );

      expect(result).toBeUndefined();
      expect(graph.openNodes).toHaveLength(2);
    });

    it("finds a path when process is repeated", () => {
      const graph = createGraph(grid);

      let result = undefined;
      while (result === undefined) {
        result = findPath(graph, [3, 0], (pos) => pos[0] === 4 && pos[1] === 2);
      }

      expect(result).toEqual([
        [3, 0],
        [2, 0],
        [1, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [1, 4],
        [2, 4],
        [3, 3],
        [4, 2],
      ]);
    });
  });
});
