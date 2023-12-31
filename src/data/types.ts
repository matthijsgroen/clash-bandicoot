import { CSSProperties } from "react";
import { BaseLayout } from "../engine/types";

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

export type UnitCategory = "ground" | "air";

export type BuildingEditAction = {
  label: string;
  icon: string;
  enabled?: (base: BaseLayout) => boolean;
  mutation: {
    mutationType: "changeType";
    newType: string;
  };
};

export type Building<
  Settings extends Record<string, unknown> = Record<string, unknown>
> = {
  type: string;
  level: number;
  displayName?: string;
  buildingColor?: CSSProperties["color"];
  editActions?: BuildingEditAction[];
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
  | "wallbreaker"
  | "balloon"
  | "wizard"
  | "healer"
  | "dragon"
  | "pekka";

export type BuildingLimit = {
  thLevel: number;
  type: string;
  amount: number;
};

export type TargetPreference = {
  category: BuildingCategory | UnitCategory;
  multiplier?: number;
};

export type Troop<
  AISettings extends Record<string, unknown> = Record<string, unknown>
> = {
  type: TroopType;
  level: number;
  size: number;
  category: UnitCategory;
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
  aiSettings?: AISettings;
};
