import { Graph, GraphNode, ObstacleGrid } from "./types";

export const createGraph = (grid: ObstacleGrid): Graph => {
  const open: GraphNode[] = [];
  const closed: GraphNode[] = [];

  const graph: (GraphNode | undefined)[][] = Array(grid.length)
    .fill(0)
    .map(() => Array(grid[0].length).fill(undefined));

  const get = (x: number, y: number) => {
    let node = graph[y][x];
    if (node === undefined) {
      const gridItem = grid[y][x];
      if (gridItem === undefined) {
        return undefined;
      }
      node = {
        x,
        y,
        weight: gridItem ?? -1,

        f: 0,
        g: 0,
        h: 0,

        open: false,
        closed: false,
      };
      graph[y][x] = node;
    }
    return node;
  };

  return {
    get,
    openNodes: open,
    closedNodes: closed,
    open: (node: GraphNode) => {
      node.open = true;
      open.push(node);
    },
    close: (node: GraphNode) => {
      node.closed = true;
      if (node.open) {
        node.open = false;
        const idx = open.indexOf(node);
        open.splice(idx, 1);
      }

      closed.push(node);
    },
    getNeighbors: () => [],
  };
};
