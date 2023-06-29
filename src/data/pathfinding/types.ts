export type ObstacleGrid = number[][];

export type GraphNode = {
  x: number;
  y: number;
  weight: number;

  open: boolean;
  closed: boolean;

  /** Travel cost */
  g: number;
  /** Heuristics score */
  h: number;
  /** Total Cost (travel + heuristic + weight) */
  f: number;

  parent?: GraphNode;
};

export type Graph = {
  readonly openNodes: GraphNode[];
  readonly closedNodes: GraphNode[];

  open: (node: GraphNode) => void;
  close: (node: GraphNode) => void;
  get: (x: number, y: number) => GraphNode | undefined;

  getNeighbors: (node: GraphNode) => GraphNode[];
};
