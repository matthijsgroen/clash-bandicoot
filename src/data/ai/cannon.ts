import { EntityAI } from "./type";
import { getDistance } from "../utils/getDistance";
import { BaseBuilding } from "../types";

type CannonData = {
  currentTarget?: string;
  attackDelay: number;
};

type CannonSettings = {
  firingRate: number;
  damage: number;
  unitGroup: "ground" | "all";
};

export const cannon: EntityAI = (state, buildingId, delta) => {
  const building = state.baseData[buildingId] as BaseBuilding<
    CannonData,
    CannonSettings
  >;
  if (building.hitPoints <= 0) {
    return;
  }
  const buildingRange = building.building.info.triggerRadius ?? 0;
  if (!building.buildingData.currentTarget) {
    const unitGroup = building.building.info.aiSettings.unitGroup;
    // check if something is in range.
    const inRange = Object.entries(state.unitData).filter(
      ([, target]) =>
        (target.info.category === unitGroup || unitGroup === "all") &&
        target.hitPoints > 0 &&
        getDistance(building.center, target) <= buildingRange
    );
    // console.log(inRange, building.buildingData.unitGroup);
    building.buildingData.currentTarget = inRange[0]?.[0];
    building.buildingData.attackDelay =
      building.building.info.aiSettings.firingRate * 1000;
  } else {
    // check if unit is still alive AND in range.
    // remove target otherwise
    const target = state.unitData[building.buildingData.currentTarget];
    if (
      target.hitPoints <= 0 ||
      getDistance(building.center, target) > buildingRange
    ) {
      building.buildingData.currentTarget = undefined;
      return;
    }
    if (building.buildingData.attackDelay > 0) {
      building.buildingData.attackDelay -= delta;
    } else {
      target.hitPoints -= building.building.info.aiSettings.damage;
      if (target.hitPoints < 0) {
        target.hitPoints = 0;
      }
      building.buildingData.attackDelay =
        building.building.info.aiSettings.firingRate * 1000;
    }
  }
};
