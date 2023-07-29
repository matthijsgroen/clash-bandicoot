import { Path } from "../../pathfinding/types";
import { BattleBuildingState, BattleState, BattleUnitState } from "../../types";
import { getDistance } from "../../utils/getDistance";
import { isUnitInRange } from "./getPaths";

export type MovementData = {
  path?: Path;
  currentAngle?: [sin: number, cos: number];
};

export const walk = (
  state: BattleState,
  unit: BattleUnitState<MovementData>,
  wallBehavior: (wall: [id: string, state: BattleBuildingState]) => boolean,
  delta: number
) => {
  if (!unit.unitData.path) return;

  if (getDistance(unit.unitData.path[0], unit.position) < 0.1) {
    unit.unitData.path.shift();
    unit.unitData.currentAngle = undefined;
  }

  const nextPoint = unit.unitData.path[0];
  if (!nextPoint) {
    // unit.unitData.currentTarget = undefined;
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
    if (wall && isUnitInRange(wall[1], unit) && wallBehavior(wall)) return;

    // if (wall && isInRange(wall[1], unit)) {
    //   // console.log("Breaking wall", tileCoord, nextPoint);
    //   attack(unit, wall[0], state, delta);
    //   return;
    // }
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
};
