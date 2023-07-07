export type ObstacleGrid = number[][];

export type GraphNode = {
  x: number;
  y: number;
  weight: number;

  open: boolean;
  closed: boolean;

  travelCost: number;
  /** Total Cost (travel + weight) */
  totalCost: number;

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

export type Path = [x: number, y: number][];
