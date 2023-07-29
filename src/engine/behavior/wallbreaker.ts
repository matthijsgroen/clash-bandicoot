import { interpolate } from "../pathfinding/path";
import {
  BattleBuildingState,
  BattleEffectState,
  BattleState,
  BattleUnitState,
} from "../types";
import { PathFindingData, getPaths, isUnitInRange } from "./modules/getPaths";
import { selectTargets } from "./modules/selectTargets";
import { walk } from "./modules/walking";
import { EntityAI } from "./type";

export type GroundUnitData = {
  currentTarget?: string;
  groupIndex?: number;
  path?: [x: number, y: number][];
  currentAngle?: [sin: number, cos: number];
  attackDelay: number;
} & PathFindingData;

type UnitAISettings = {
  damageWhenDestroyed: number;
  damageRadius: number;
};

const attack = (
  unit: BattleUnitState<GroundUnitData, UnitAISettings>,
  unitId: string,
  state: BattleState,
  delta: number
) => {
  unit.state = "attacking";
  if (unit.unitData.attackDelay > 0) {
    unit.unitData.attackDelay -= delta;
  } else {
    const explosion: BattleEffectState<{
      damage: number;
      damageDealt: boolean;
    }> = {
      type: "explosion",
      level: unit.level,
      position: unit.position,
      aiType: "attackerExplosion",
      effectData: {
        damage: unit.info.damage,
        damageDealt: false,
      },
      targetModifiers: unit.info.targetPreference,
      range: unit.info.aiSettings?.damageRadius ?? 1,
      delay: 0,
      duration: 200,
      state: "idle",
    };
    state.effectData[`${unitId}-explosion`] = explosion;

    unit.hitPoints = 0;
    unit.state = "dead";
  }
};

export const wallBreaker: EntityAI = (state, unitId, delta) => {
  const unit = state.unitData[unitId] as BattleUnitState<
    GroundUnitData,
    UnitAISettings
  >;

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
    const grid = state.grid;

    const flooredPos: [x: number, y: number] = unit.position.map(
      Math.floor
    ) as [x: number, y: number];

    const preferredTargets = Object.entries(state.baseData)
      .filter(([, b]) => {
        if (b.hitPoints <= 0 || b.building.info.type === "wall" || !b.visible)
          return false;

        const line = interpolate(flooredPos, b.building.position);

        for (let j = 1; j < line.length; ++j) {
          const testCoord = line[j];

          if (grid[testCoord[1]][testCoord[0]] > 0) {
            return true;
          }
        }
        return false;
      })
      .map(([id, b]) => {
        const dx = Math.abs(
          unit.position[0] -
            b.building.position[0] +
            b.building.info.size[0] / 2
        );
        const dy = Math.abs(
          unit.position[1] -
            b.building.position[1] +
            b.building.info.size[1] / 2
        );
        return {
          target: [id, b],
          distance: dx + dy,
        };
      })
      .sort((a, b) => a.distance - b.distance);

    const targets =
      preferredTargets.length > 0
        ? [preferredTargets[0].target as [string, BattleBuildingState]]
        : selectTargets(state, unit.info.targetPreference);

    const paths = getPaths(state, unit, targets, 0.5);

    if (paths.length > 0) {
      console.log(paths);
      const path = paths[(unit.unitData.groupIndex ?? 0) % paths.length];
      unit.unitData.currentTarget = path.target;
      unit.unitData.path = path.path;
      unit.unitData.attackDelay = unit.info.attackSpeed * 1000;
      unit.unitData.groupIndex = 0;
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
        () => {
          attack(unit, unitId, state, delta);
          return true;
        },
        delta
      );
      if (unit.unitData.path === undefined) {
        // If we lost our path, we will search a new target
        unit.unitData.currentTarget = undefined;
      }
    } else {
      attack(unit, unitId, state, delta);
    }
  }
};
