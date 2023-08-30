import { Building, TargetPreference, Troop, TroopType } from "../data/types";
import { Army } from "./army/armyComposition";
import { ObstacleGrid } from "./pathfinding/types";

export type Position = [x: number, y: number];

export type Placement = {
  unit: TroopType;
  level: number;
  timestamp: number;
  position: Position;
};

export type Replay = {
  placement: Placement[];
};

export type LayoutBuilding<
  Settings extends Record<string, unknown> = Record<string, unknown>
> = {
  position: Position;
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
  lastHitAt: number;
  effects: [];
  center: Position;
  building: LayoutBuilding<Settings>;
  state: string;
  visible: boolean;
  buildingData: T;
};

export type BattleBaseData = Record<string, BattleBuildingState>;

export type BattleUnitState<
  T extends Record<string, unknown> = Record<string, unknown>,
  AISettings extends Record<string, unknown> = Record<string, unknown>
> = {
  hitPoints: number;
  lastHitAt: number;
  effects: [];
  type: TroopType;
  level: number;
  position: Position;
  info: Troop<AISettings>;
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
  position: Position;
  range: number;
  info?: unknown; //Spell;
  targetModifiers: TargetPreference[];
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
