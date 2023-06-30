import { EntityAI } from "./type";
import { getDistance } from "../utils/getDistance";
import { BattleBuildingState, BattleUnitState } from "../types";

type GroundUnitData = {
  currentTarget?: string;
  path?: [x: number, y: number][];
  currentAngle?: [sin: number, cos: number];
  attackDelay: number;
};

const isInRange = (building: BattleBuildingState, unit: BattleUnitState) => {
  const minX = building.building.position[0] - unit.info.hitRadius;
  const maxX =
    building.building.position[0] +
    building.building.info.size[0] +
    unit.info.hitRadius;
  const minY = building.building.position[1] - unit.info.hitRadius;
  const maxY =
    building.building.position[1] +
    building.building.info.size[1] +
    unit.info.hitRadius;

  return (
    unit.position[0] > minX &&
    unit.position[0] < maxX &&
    unit.position[1] > minY &&
    unit.position[1] < maxY
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
    let closestTarget: null | { distance: number; id: string } = null;

    for (const buildingId in state.baseData) {
      const building = state.baseData[buildingId];
      if (building.hitPoints <= 0) continue;
      const distance = getDistance(building.center, unit);

      // Next step: Route -- using pathFinder.
      // make small map of close area, use pathing to determine distance.
      // with an absolute path and a walk path distance

      if (closestTarget === null || closestTarget.distance > distance) {
        closestTarget = { distance, id: buildingId };
      }
    }
    if (closestTarget) {
      const building = state.baseData[closestTarget.id];
      unit.unitData.currentTarget = closestTarget.id;
      unit.unitData.path = [[building.center[0], building.center[1]]];
      unit.unitData.attackDelay = unit.info.attackSpeed * 1000;
    }
  } else {
    // TODO: Target could be another unit
    const building = state.baseData[unit.unitData.currentTarget];
    if (building.hitPoints <= 0) {
      unit.unitData.currentTarget = undefined;
      unit.unitData.currentAngle = undefined;
      unit.state = "idle";
      return;
    }
    const inRange = isInRange(building, unit);
    if (!inRange && unit.unitData.path) {
      if (
        unit.position[0] === unit.unitData.path[0][0] &&
        unit.position[1] === unit.unitData.path[0][1]
      ) {
        unit.unitData.path.pop();
        unit.unitData.currentAngle = undefined;
      }
      const nextPoint = unit.unitData.path[0];
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
