import { EntityAI } from "./type";
import { BattleState, BattleUnitState } from "../types";
import { createObstacleGrid } from "../pathfinding/obstacleGrid";
import { applyDamage } from "./utils";
import { selectTargets } from "./modules/selectTargets";
import { PathFindingData, getPaths, isUnitInRange } from "./modules/getPaths";
import { getGroupIndex } from "./modules/getGroupIndex";
import { MovementData, walk } from "./modules/walking";

export type GroundUnitData = {
  currentTarget?: string;
  groupIndex?: number;
  attackDelay: number;
} & PathFindingData &
  MovementData;

const attack = (
  unit: BattleUnitState<GroundUnitData>,
  targetId: string,
  state: BattleState,
  delta: number
) => {
  unit.state = "attacking";
  if (unit.unitData.attackDelay > 0) {
    unit.unitData.attackDelay -= delta;
  } else {
    const building = state.baseData[targetId];
    if (building.hitPoints > 0) {
      const preferenceActive = unit.info.targetPreference.find((p) =>
        building.building.info.categories.some((c) => c === p.category)
      );
      const multiplier = preferenceActive?.multiplier ?? 1;
      applyDamage(building, unit.info.damage * multiplier, state.timeSpent);
      if (building.hitPoints === 0) {
        state.grid = createObstacleGrid(state.layout, state.baseData);
        unit.state = "idle";
      }
    }

    unit.unitData.attackDelay = unit.info.attackSpeed * 1000;
  }
};

export const groundUnit: EntityAI = (state, unitId, delta) => {
  const unit = state.unitData[unitId] as BattleUnitState<GroundUnitData>;

  if (unit.state === "dead") {
    return;
  }
  if (unit.hitPoints <= 0 && unit.state !== "dead") {
    // Add 'dying' behavior here
    unit.state = "dead";
    return;
  }

  if (!unit.unitData.currentTarget) {
    unit.state = "idle";
    const targets = selectTargets(state, unit.info.targetPreference);
    const paths = getPaths(state, unit, targets);

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

    const inRange = isUnitInRange(building, unit);
    if (!inRange && unit.unitData.path) {
      walk(
        state,
        unit,
        (wall) => {
          attack(unit, wall[0], state, delta);
          return true;
        },
        delta
      );
      if (unit.unitData.path === undefined) {
        // If we lost our path, we will search a new target
        unit.unitData.currentTarget = undefined;
      }
    } else {
      attack(unit, unit.unitData.currentTarget, state, delta);
    }
  }
};
