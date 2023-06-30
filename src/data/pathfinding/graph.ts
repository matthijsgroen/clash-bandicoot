import { Graph, GraphNode, ObstacleGrid } from "./types";

export const createGraph = (grid: ObstacleGrid): Graph => {
  const open: GraphNode[] = [];
  const closed: GraphNode[] = [];

  const graph: (GraphNode | undefined)[][] = Array(grid.length)
    .fill(0)
    .map(() => Array(grid[0].length).fill(undefined));

  const get = (x: number, y: number) => {
    let node = graph[y]?.[x];
    if (node === undefined) {
      const gridItem = grid[y]?.[x];
      if (gridItem === undefined) {
        return undefined;
      }
      node = {
        x,
        y,
        weight: gridItem ?? -1,
        travelCost: 0,
        totalCost: 0,

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
      if (!node.open && !node.closed) {
        node.open = true;
        open.push(node);
      }
      open.sort((a, b) => a.totalCost - b.totalCost);
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
    getNeighbors: (node) => {
      const result: GraphNode[] = [];

      const deltaAdd = (xDelta: number, yDelta: number) => {
        const neighbor = get(node.x + xDelta, node.y + yDelta);
        if (neighbor) {
          result.push(neighbor);
        }
      };

      deltaAdd(-1, 0); // left
      deltaAdd(1, 0); // right
      deltaAdd(0, -1); // up
      deltaAdd(0, 1); // down

      deltaAdd(-1, -1); // top left
      deltaAdd(1, -1); // top right

      deltaAdd(-1, 1); // bottom left
      deltaAdd(1, 1); // bottom right

      return result;
    },
  };
};
