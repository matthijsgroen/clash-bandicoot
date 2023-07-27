export type Cost = {
  amount: number;
  type: "elixir" | "darkElixir" | "gold" | "gems";
  time: number;
};

export type BuildingCategory =
  | "defense"
  | "resource"
  | "wall"
  | "air-defense"
  | "army"
  | "trap";

export type Building<
  Settings extends Record<string, unknown> = Record<string, unknown>
> = {
  type: string;
  level: number;
  size: [width: number, height: number];
  thRequirement: number;
  categories: BuildingCategory[];
  cost: Cost;
  hitPoints: number;
  triggerRadius?: number;
  triggerDeadZone?: number;

  aiType?: string;
  aiSettings: Settings;
};

export type TroopType =
  | "barbarian"
  | "archer"
  | "giant"
  | "goblin"
  | "wallbreaker";

export type BuildingLimit = {
  thLevel: number;
  type: string;
  amount: number;
};

export type TargetPreference = {
  category: BuildingCategory;
  multiplier?: number;
};

export type Troop = {
  type: TroopType;
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
