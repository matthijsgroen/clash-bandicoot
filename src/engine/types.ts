import { Building, Troop } from "../data/types";
import { Army } from "./armyComposition";
import { ObstacleGrid } from "./pathfinding/types";

export type Placement = {
  unit: string;
  level: number;
  timestamp: number;
  position: [x: number, y: number];
};

export type Replay = {
  placement: Placement[];
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
  state: string;
  buildingData: T;
};

export type BattleBaseData = Record<string, BattleBuildingState>;

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

/**
 * Used for bombs, mortars, spells
 */
export type BattleEffectState<
  T extends Record<string, unknown> = Record<string, unknown>
> = {
  type: string;
  level: number;
  position: [x: number, y: number];
  range: number;
  info?: unknown; //Spell;
  aiType: string;
  effectData: T;
  delay: number;
  duration: number;
  state: string;
};

export type BattleUnitData = Record<string, BattleUnitState>;
export type BattleEffectData = Record<string, BattleEffectState>;

export type BattleState = {
  timeLeft: number;
  timeSpent: number;
  damage: number;
  stars: number;
  state: "preparation" | "battle" | "ended";

  army: Army;
  grid: ObstacleGrid;
  layout: BaseLayout;

  baseData: BattleBaseData;
  unitData: BattleUnitData;
  effectData: BattleEffectData;
  replay: Replay;
};
