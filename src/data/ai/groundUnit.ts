import { EntityAI } from "./type";

export const groundUnit: EntityAI = (state, unitId, delta) => {
  const unitData = state.unitData[unitId];
  if (!unitData.unitData.target) {
    let closestTarget: null | { distance: number; id: string } = null;

    for (const buildingId in state.baseData) {
      const building = state.baseData[buildingId];
      if (building.hitPoints <= 0) continue;
      const distance = Math.sqrt(
        Math.pow(building.center[0] - unitData.position[0], 2) +
          Math.pow(building.center[1] - unitData.position[1], 2)
      );
      if (closestTarget === null || closestTarget.distance > distance) {
        closestTarget = { distance, id: buildingId };
      }
    }
    console.log("picking target for", unitId);
    if (closestTarget) {
      unitData.unitData.target = closestTarget.id;
      console.log("found", closestTarget.id);
    }
  }
};
