import { EntityAI } from "./type";
import { BattleBuildingState, BattleEffectState } from "../types";
import { getDistance } from "../utils/getDistance";

type BombData = {
  triggered: boolean;
  explosionDelay: number;
};

type BombSettings = {
  damage: number;
  unitGroup: "ground" | "all";
  splash: number;
  firingRate: number;
};

export const bomb: EntityAI = (state, buildingId, delta) => {
  const building = state.baseData[buildingId] as BattleBuildingState<
    BombData,
    BombSettings
  >;
  if (building.hitPoints <= 0) {
    return;
  }
  const buildingInfo = building.building.info;
  const buildingRange = buildingInfo.triggerRadius ?? 0;

  if (building.buildingData.triggered) {
    building.buildingData.explosionDelay -= delta;
    if (building.buildingData.explosionDelay <= 0) {
      building.hitPoints = 0;
    }
  } else {
    const unitGroup = buildingInfo.aiSettings.unitGroup;
    // check if something is in range.

    // TODO: This is repeated multiple times now, time to extract it!
    const inRange = Object.entries(state.unitData).filter(([, target]) => {
      if (
        (target.info.category !== unitGroup && unitGroup !== "all") ||
        target.hitPoints <= 0
      ) {
        return false;
      }
      const distance = getDistance(building.center, target.position);

      return distance <= buildingRange;
    });

    if (inRange.length > 0) {
      building.buildingData.triggered = true;
      const explosion: BattleEffectState<{
        damage: number;
        damageDealt: boolean;
      }> = {
        type: "explosion",
        level: buildingInfo.level,
        position: building.center,
        aiType: "explosion",
        effectData: {
          damage: buildingInfo.aiSettings.damage,
          damageDealt: false,
        },
        targetModifiers: [],
        range: buildingInfo.aiSettings.splash,
        delay: building.building.info.aiSettings.firingRate * 1000,
        duration: 200,
        state: "idle",
      };
      state.effectData[`${buildingId}-explosion`] = explosion;
      building.visible = true;
      building.buildingData.explosionDelay =
        building.building.info.aiSettings.firingRate * 1000;
    }
  }
};
