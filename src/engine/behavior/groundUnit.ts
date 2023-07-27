import { EntityAI } from "./type";
import { getDistance } from "../utils/getDistance";
import { BattleState, BattleUnitState } from "../types";
import { createObstacleGrid } from "../pathfinding/obstacleGrid";
import { applyDamage } from "./utils";
import { selectTargets } from "./modules/selectTargets";
import { PathFindingData, getPaths, isInRange } from "./modules/getPaths";
import { getGroupIndex } from "./modules/getGroupIndex";

export type GroundUnitData = {
  currentTarget?: string;
  groupIndex?: number;
  path?: [x: number, y: number][];
  currentAngle?: [sin: number, cos: number];
  attackDelay: number;
} & PathFindingData;

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
    const inRange = isInRange(building, unit);
    if (!inRange && unit.unitData.path) {
      if (getDistance(unit.unitData.path[0], unit.position) < 0.1) {
        unit.unitData.path.shift();
        unit.unitData.currentAngle = undefined;
      }

      const nextPoint = unit.unitData.path[0];
      if (!nextPoint) {
        unit.unitData.currentTarget = undefined;
        unit.unitData.currentAngle = undefined;
        unit.unitData.path = undefined;
        unit.state = "idle";
        return;
      }

      // is next step a wall? start breaking through
      const tileCoord = [Math.floor(nextPoint[0]), Math.floor(nextPoint[1])];
      const tileValue = state.grid[tileCoord[1]][tileCoord[0]];
      if (tileValue > 0) {
        const wall = Object.entries(state.baseData).find(
          ([, s]) =>
            s.building.info.type === "wall" &&
            s.hitPoints > 0 &&
            s.building.position[0] === tileCoord[0] &&
            s.building.position[1] === tileCoord[1]
        );
        if (wall && isInRange(wall[1], unit)) {
          // console.log("Breaking wall", tileCoord, nextPoint);
          attack(unit, wall[0], state, delta);
          return;
        }
      }

      if (!unit.unitData.currentAngle) {
        const angle = Math.atan2(
          nextPoint[1] - unit.position[1],
          nextPoint[0] - unit.position[0]
        );
        unit.unitData.currentAngle = [Math.cos(angle), Math.sin(angle)];
      }
      // https://clashofclans.fandom.com/wiki/Troop_Movement_Speed
      const movementDistanceTick =
        ((unit.info.movementSpeed * 12.5) / 100_000) * delta;

      unit.position[0] += unit.unitData.currentAngle[0] * movementDistanceTick;
      unit.position[1] += unit.unitData.currentAngle[1] * movementDistanceTick;
      unit.state = "moving";
    } else {
      attack(unit, unit.unitData.currentTarget, state, delta);
    }
  }
};
