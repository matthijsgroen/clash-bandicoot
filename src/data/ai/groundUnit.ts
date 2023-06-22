import { EntityAI } from "./type";

export const groundUnit: EntityAI = (state, unitId, delta) => {
  const unitData = state.unitData[unitId];
  if (!unitData.unitData.target) {
    console.log("picking target for", unitId);

    //  state.baseData.

    return;
  }
};
