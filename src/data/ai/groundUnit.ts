import { EntityAI } from "./type";
import { getDistance } from "../utils/getDistance";
import { BattleBuildingState, BattleUnitState } from "../types";
import { findPath } from "../pathfinding/pathfinding";
import { createGraph } from "../pathfinding/graph";
import { createObstacleGrid } from "../pathfinding/grid";
import { Path } from "../pathfinding/types";
import { simplifyPath } from "../pathfinding/path";

type GroundUnitData = {
  currentTarget?: string;
  path?: [x: number, y: number][];
  currentAngle?: [sin: number, cos: number];
  attackDelay: number;
};

const isInRange = (
  building: BattleBuildingState,
  unit: BattleUnitState,
  position?: [x: number, y: number]
) => {
  const pos = position ?? unit.position;
  return (
    getDistance(pos, building.center) - building.building.info.size[0] / 1.5 <
    unit.info.hitRadius
  );
};

export const groundUnit: EntityAI = (state, unitId, delta) => {
  const unit = state.unitData[unitId] as BattleUnitState<GroundUnitData>;
  if (unit.hitPoints <= 0) {
    unit.state = "dead";
    return;
  }
  if (!unit.unitData.currentTarget) {
    unit.state = "idle";

    let targets: [string, BattleBuildingState][] = [];
    for (const pref of unit.info.targetPreference) {
      if (targets.length === 0) {
        targets = Object.entries(state.baseData).filter(
          ([, b]) =>
            b.hitPoints > 0 &&
            b.building.info.categories.some((c) => c === pref)
        );
      }
    }

    if (targets.length === 0) {
      targets = Object.entries(state.baseData).filter(
        ([, b]) => b.hitPoints > 0
      );
    }

    let limitCounter = 0;
    let path: Path | undefined = undefined;

    const grid = createObstacleGrid(state.layout, state.baseData);
    const graph = createGraph(grid);
    const xOff = unit.position[0] % 1;
    const yOff = unit.position[1] % 1;

    while (path === undefined && limitCounter < 3000) {
      limitCounter++;
      path = findPath(
        graph,
        [Math.floor(unit.position[0]), Math.floor(unit.position[1])],
        ([x, y]) => {
          const coord: [number, number] = [x, y];
          for (let [id, target] of targets) {
            if (isInRange(target, unit, coord)) {
              unit.unitData.currentTarget = id;
              return true;
            }
          }
          return false;
        }
      );
    }

    if (path && path.length > 1) {
      unit.unitData.path = simplifyPath(path, grid).map(([x, y]) => [
        x + xOff,
        y + yOff,
      ]);
      unit.unitData.attackDelay = unit.info.attackSpeed * 1000;
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
      // Attack!
      unit.state = "attacking";
      if (unit.unitData.attackDelay > 0) {
        unit.unitData.attackDelay -= delta;
      } else {
        const building = state.baseData[unit.unitData.currentTarget];
        if (building.hitPoints > 0) {
          building.hitPoints -= unit.info.damage;
          if (building.hitPoints < 0) {
            building.hitPoints = 0;
            unit.state = "idle";
          }
        }

        unit.unitData.attackDelay = unit.info.attackSpeed * 1000;
      }
    }
  }
};
