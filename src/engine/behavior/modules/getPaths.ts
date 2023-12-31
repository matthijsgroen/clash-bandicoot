import { createGraph } from "../../pathfinding/graph";
import { roughPathLength, simplifyPath } from "../../pathfinding/path";
import { findPath } from "../../pathfinding/pathfinding";
import { Graph, Path } from "../../pathfinding/types";
import { BattleBuildingState, BattleState, BattleUnitState } from "../../types";
import { getBuildingDistance, getDistance } from "../../utils/getDistance";

export const isUnitInRange = (
  building: BattleBuildingState,
  unit: BattleUnitState,
  position?: [x: number, y: number]
) => inRange(building, position ?? unit.position, unit.info.hitRadius);

export const isAirUnitInRange = (
  building: BattleBuildingState,
  unit: BattleUnitState,
  position?: [x: number, y: number]
) => {
  const distance = getDistance(position ?? unit.position, building.center);
  return distance < unit.info.hitRadius;
};

export const inRange = (
  building: BattleBuildingState,
  position: [x: number, y: number],
  radius: number
) => getBuildingDistance(building.building, position) < radius;

const TARGET_SELECTION_TOLERANCE = 0.5;

export type PathFindingData = {
  pathGraph?: Graph;
  pathIterations: number;
  pathStorage?: { path: Path; target: string; cost: number }[];
};

export const getWalkPaths = (
  state: BattleState,
  unit: BattleUnitState<PathFindingData>,
  targets: [string, BattleBuildingState][],
  wallWeight: number = 1
): { path: Path; target: string; cost: number }[] => {
  unit.unitData.pathIterations ??= 0;
  let limitCounter = 0;

  const graph = (unit.unitData.pathGraph ??= createGraph(state.grid));

  const roundX = Math.floor(unit.position[0]);
  const roundY = Math.floor(unit.position[1]);
  const xOff = unit.position[0] - roundX;
  const yOff = unit.position[1] - roundY;

  let searchDone = false;
  const paths: { path: Path; target: string; cost: number }[] =
    unit.unitData.pathStorage ?? [];
  const startLength = paths.length;

  /**
   * As performance improvement, we could lower this limit counter drastically
   */
  while (!searchDone && limitCounter < 300) {
    limitCounter++;
    let currentTarget: null | string = null;

    let path = findPath(
      graph,
      [roundX, roundY],
      ([x, y]) => {
        const coord: [number, number] = [x + xOff, y + yOff];
        for (let [id, target] of targets) {
          if (
            isUnitInRange(target, unit, coord) &&
            paths.every((p) => p.target !== id)
          ) {
            currentTarget = id;
            return true;
          }
        }
        return false;
      },
      wallWeight
    );
    if (path && path.length === 0) {
      searchDone = true;
      break;
    }
    if (path && path.length > 0 && currentTarget) {
      const sPath: Path = simplifyPath(path, state.grid).map(([x, y]) => [
        x + xOff,
        y + yOff,
      ]);
      const pathCost = roughPathLength(sPath);

      if (
        paths.length > 0 &&
        paths[0].cost < pathCost - TARGET_SELECTION_TOLERANCE
      ) {
        searchDone = true;
        break;
      } else {
        paths.push({ path: sPath, target: currentTarget, cost: pathCost });
      }
    }
  }
  unit.unitData.pathIterations += limitCounter;
  unit.unitData.pathStorage = paths;

  if (
    unit.unitData.pathIterations > 3000 ||
    searchDone ||
    (paths.length > 0 && paths.length === startLength)
  ) {
    unit.unitData.pathGraph = undefined;
    unit.unitData.pathIterations = 0;
    unit.unitData.pathStorage = [];

    return paths;
  }

  return [];
};

export const getFlyPaths = (
  state: BattleState,
  unit: BattleUnitState,
  targets: [string, BattleBuildingState][]
): { path: Path; target: string; cost: number }[] =>
  targets
    .map(([id, building]) => ({
      target: id,
      building,
      cost: getDistance(unit.position, building.center),
    }))
    .sort((a, b) => a.cost - b.cost)
    .filter((t, _i, l) => t.cost <= l[0].cost + TARGET_SELECTION_TOLERANCE)
    .map(({ target, building, cost }) => ({
      target,
      path: [unit.position, building.center],
      cost,
    }));
