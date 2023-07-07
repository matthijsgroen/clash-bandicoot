import { createGraph } from "./graph";
import { ObstacleGrid } from "./types";

describe("createGraph", () => {
  const grid: ObstacleGrid = [
    [1, 0, 0, 0, 0],
    [0, -1, -1, -1, -1],
    [0, -1, 0, 0, 0],
    [0, 8, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];

  describe("get", () => {
    it("returns a graphNode", () => {
      const graph = createGraph(grid);
      const item = graph.get(0, 0)!;

      expect(item.x).toEqual(0);
      expect(item.y).toEqual(0);
      expect(item.weight).toEqual(1);
    });

    it("returns the same instance as previous request", () => {
      const graph = createGraph(grid);
      const item = graph.get(0, 0);
      const item2 = graph.get(0, 0);

      expect(item).toBe(item2);
    });

    it("returns undefined if outside of grid", () => {
      const graph = createGraph(grid);
      const item = graph.get(8, 0);

      expect(item).toBeUndefined();
    });
  });

  describe("open", () => {
    it("marks item as open", () => {
      const graph = createGraph(grid);
      const item = graph.get(0, 0)!;

      graph.open(item);

      expect(item.open).toEqual(true);
    });

    it("adds item to open list", () => {
      const graph = createGraph(grid);
      const item = graph.get(0, 0)!;

      graph.open(item);

      expect(graph.openNodes).toEqual([item]);
    });
  });

  describe("close", () => {
    it("marks item as closed", () => {
      const graph = createGraph(grid);
      const item = graph.get(0, 0)!;

      graph.open(item);
      graph.close(item);

      expect(item.open).toEqual(false);
      expect(item.closed).toEqual(true);
    });

    it("adds item to closed list", () => {
      const graph = createGraph(grid);
      const item = graph.get(0, 0)!;

      graph.open(item);
      graph.close(item);

      expect(graph.closedNodes).toEqual([item]);
    });

    it("removes item from open list", () => {
      const graph = createGraph(grid);
      const item = graph.get(0, 0)!;

      graph.open(item);
      graph.close(item);

      expect(graph.openNodes).toEqual([]);
    });
  });

  describe("neighbors", () => {
    it("returns all neighbors of a node", () => {
      const graph = createGraph(grid);
      const item = graph.get(0, 0)!;

      const neighbors = graph.getNeighbors(item);
      expect(neighbors).toHaveLength(3);
    });
  });
});
