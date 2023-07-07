import { Graph, Path } from "./types";

const TILE_TRAVEL_COST = 1;

export const findPath = (
  graph: Graph,
  start: [x: number, y: number],
  reachTarget: (pos: [x: number, y: number]) => boolean
): Path | undefined => {
  if (graph.openNodes.length === 0 && graph.closedNodes.length === 0) {
    // clean graph, start with start node.
    const startNode = graph.get(start[0], start[1]);
    startNode && graph.open(startNode);
  }

  const currentNode = graph.openNodes[0];
  if (!currentNode) return []; // no path found

  graph.close(currentNode);
  if (reachTarget([currentNode.x, currentNode.y])) {
    const result: Path = [];
    let node = currentNode;
    result.push([node.x, node.y]);
    while (node.parent) {
      node = node.parent;
      result.push([node.x, node.y]);
    }
    // Build up path
    return result.reverse();
  }
  const neighbors = graph.getNeighbors(currentNode);
  for (const neighbor of neighbors) {
    if (neighbor.closed) {
      continue;
    }
    const x = neighbor.x;
    const y = neighbor.y;

    // get the distance between current node and the neighbor
    // and calculate the next g score
    const travelCost =
      currentNode.travelCost +
      (x - currentNode.x === 0 || y - currentNode.y === 0
        ? TILE_TRAVEL_COST
        : Math.SQRT2 * TILE_TRAVEL_COST);

    if (
      (!neighbor.open || travelCost < neighbor.travelCost) &&
      neighbor.weight !== -1
    ) {
      neighbor.travelCost = travelCost;
      neighbor.totalCost = travelCost + neighbor.weight;
      neighbor.parent = currentNode;

      graph.open(neighbor);
    }
  }

  return undefined;
};
