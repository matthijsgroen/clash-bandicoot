export type Cost = {
  amount: number;
  type: "elixir" | "darkElixir" | "gold" | "gems";
  time: number;
};

export type Placement = {
  unit: string;
  level: number;
  timestamp: number;
  position: [x: number, y: number];
};

export type Replay = {
  placement: Placement[];
};

export type Building<
  Settings extends Record<string, unknown> = Record<string, unknown>
> = {
  type: string;
  level: number;
  size: [width: number, height: number];
  thRequirement: number;
  category: "resource" | "defense" | "army" | "trap" | "other";
  cost: Cost;
  hitPoints: number;
  triggerRadius?: number;

  aiType?: string;
  aiSettings: Settings;
};

export type LayoutBuilding<
  Settings extends Record<string, unknown> = Record<string, unknown>
> = {
  position: [x: number, y: number];
  buildingId: string;
  info: Building<Settings>;
  buildingState?: string;
  buildingDirection?: number;
};

export type BaseLayout = {
  gridSize: [width: number, height: number];
  items: Record<string, LayoutBuilding>;
};

export type BattleBuildingState<
  T extends Record<string, unknown> = Record<string, unknown>,
  Settings extends Record<string, unknown> = Record<string, unknown>
> = {
  hitPoints: number;
  effects: [];
  center: [x: number, y: number];
  building: LayoutBuilding<Settings>;
  buildingData: T;
};

export type BattleBaseData = Record<string, BattleBuildingState>;

export type TargetPreference = "defense" | "resource" | "wall" | "air-defense";

export type Troop = {
  type: string;
  level: number;
  size: number;
  category: "ground" | "air";
  movementSpeed: number;
  attackSpeed: number;
  damage: number;

  barrackRequirement: number;
  laboratoryRequirement: number;

  targetPreference: TargetPreference[];
  trainingTime: number;

  researchCost: Cost;

  hitPoints: number;
  hitRadius: number;

  aiType?: string;
  aiSettings?: Record<string, unknown>;
};

export type BattleUnitState<
  T extends Record<string, unknown> = Record<string, unknown>
> = {
  hitPoints: number;
  effects: [];
  type: string;
  level: number;
  position: [x: number, y: number];
  info: Troop;
  unitData: T;
  state: string;
};

export type BattleUnitData = Record<string, BattleUnitState>;

export type BattleState = {
  timeSpent: number;
  damage: number;
  stars: number;
  state: "preparation" | "battle" | "ended";

  baseData: BattleBaseData;
  unitData: BattleUnitData;
  replay: Replay;
};
