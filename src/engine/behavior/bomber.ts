import { BattleEffectState, BattleState, BattleUnitState } from "../types";
import { getGroupIndex } from "./modules/getGroupIndex";
import { getFlyPaths, isAirUnitInRange } from "./modules/getPaths";
import { MovementData, fly } from "./modules/movement";
import { selectTargets } from "./modules/selectTargets";
import { EntityAI } from "./type";

export type AirUnitData = {
  currentTarget?: string;
  groupIndex?: number;
  attackDelay: number;
} & MovementData;

type UnitAISettings = {
  damageWhenDestroyed: number;
  damageRadius: number;
};

const explosion = (
  unit: BattleUnitState<AirUnitData, UnitAISettings>,
  position: [x: number, y: number],
  unitId: string,
  damage: number,
  state: BattleState
) => {
  const explosion: BattleEffectState<{
    damage: number;
    damageDealt: boolean;
  }> = {
    type: "explosion",
    level: unit.level,
    position,
    aiType: "attackerExplosion",
    effectData: {
      damage,
      damageDealt: false,
    },
    targetModifiers: [],
    range: unit.info.aiSettings?.damageRadius ?? 1,
    delay: 0,
    duration: 200,
    state: "idle",
  };
  state.effectData[`${unitId}-explosion`] = explosion;
};

const attack = (
  unit: BattleUnitState<AirUnitData, UnitAISettings>,
  position: [x: number, y: number],
  unitId: string,
  state: BattleState,
  delta: number
) => {
  unit.state = "attacking";
  if (unit.unitData.attackDelay > 0) {
    unit.unitData.attackDelay -= delta;
  } else {
    explosion(unit, position, unitId, unit.info.damage, state);
    // unit.hitPoints = 0;
  }
};

export const bomber: EntityAI = (state, unitId, delta) => {
  const unit = state.unitData[unitId] as BattleUnitState<
    AirUnitData,
    UnitAISettings
  >;

  if (unit.state === "dead") {
    return;
  }
  if (unit.hitPoints <= 0 && unit.state !== "dead") {
    // Add 'dying' behavior here
    if (unit.info.aiSettings) {
      explosion(
        unit,
        unit.position,
        unitId,
        unit.info.aiSettings?.damageWhenDestroyed,
        state
      );
    }
    unit.state = "dead";
    return;
  }

  if (!unit.unitData.currentTarget) {
    unit.state = "idle";
    const targets = selectTargets(state, unit.info.targetPreference);
    const paths = getFlyPaths(state, unit, targets);

    if (paths.length > 0) {
      const path = paths[(unit.unitData.groupIndex ?? 0) % paths.length];

      unit.unitData.currentTarget = path.target;
      unit.unitData.path = path.path;
      unit.unitData.attackDelay = unit.info.attackSpeed * 1000;
      unit.unitData.groupIndex = getGroupIndex(state, unit);
    }
  } else {
    // TODO: Target could be another unit
    const building = state.baseData[unit.unitData.currentTarget];
    if (building.hitPoints <= 0) {
      unit.unitData.currentTarget = undefined;
      unit.unitData.currentAngle = undefined;
      unit.unitData.path = undefined;
      unit.state = "idle";
      return;
    }

    const inRange = isAirUnitInRange(building, unit);
    if (!inRange && unit.unitData.path) {
      fly(state, unit, delta);
      if (unit.unitData.path === undefined) {
        // If we lost our path, we will search a new target
        unit.unitData.currentTarget = undefined;
      }
    } else {
      attack(unit, unit.position, unitId, state, delta);
    }
  }
};
