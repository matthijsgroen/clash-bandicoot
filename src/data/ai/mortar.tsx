import { EntityAI } from "./type";
import { getDistance } from "../utils/getDistance";
import { BattleBuildingState, BattleEffectState } from "../types";

type MortarData = {
  currentTarget?: string;
  attackDelay: number;
};

type MortarSettings = {
  firingRate: number;
  damage: number;
  deadZone: number;
  unitGroup: "ground" | "all";
  splash: number;
};

export const mortar: EntityAI = (state, buildingId, delta) => {
  const building = state.baseData[buildingId] as BattleBuildingState<
    MortarData,
    MortarSettings
  >;
  if (building.hitPoints <= 0) {
    return;
  }
  const buildingInfo = building.building.info;
  const buildingRange = buildingInfo.triggerRadius ?? 0;
  const deadZone = buildingInfo.aiSettings.deadZone ?? 0;

  if (!building.buildingData.currentTarget) {
    const unitGroup = buildingInfo.aiSettings.unitGroup;
    // check if something is in range.
    const inRange = Object.entries(state.unitData).filter(([, target]) => {
      if (
        (target.info.category !== unitGroup && unitGroup !== "all") ||
        target.hitPoints <= 0
      ) {
        return false;
      }
      const distance = getDistance(building.center, target.position);

      return distance <= buildingRange && distance >= deadZone;
    });
    building.buildingData.currentTarget = inRange[0]?.[0];
    if (!building.buildingData.currentTarget) {
      // reset wait for when other target approaches
      building.buildingData.attackDelay =
        buildingInfo.aiSettings.firingRate * 1000;
    }
  } else {
    // check if unit is still alive AND in range.
    // remove target otherwise
    const target = state.unitData[building.buildingData.currentTarget];
    const distance = getDistance(building.center, target.position);
    if (
      target.hitPoints <= 0 ||
      (distance > buildingRange && distance < deadZone)
    ) {
      building.state = "idle";
      building.buildingData.currentTarget = undefined;
      return;
    }
    building.state = "attacking";
    if (building.buildingData.attackDelay > 0) {
      building.buildingData.attackDelay -= delta;
    } else {
      const explosion: BattleEffectState<{ damage: number; delay: number }> = {
        type: "explosion",
        level: buildingInfo.level,
        position: [...target.position],
        aiType: "explosion",
        effectData: {
          delay: distance,
          damage: buildingInfo.aiSettings.damage,
        },
        range: buildingInfo.aiSettings.splash,
        visible: false,
        state: "idle",
      };

      state.effectData[`${buildingId}-bomb`] = explosion;
      building.buildingData.currentTarget = undefined;
      building.buildingData.attackDelay =
        building.building.info.aiSettings.firingRate * 1000;
    }
  }
};
