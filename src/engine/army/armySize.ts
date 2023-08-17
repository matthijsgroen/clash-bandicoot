import { buildingStore } from "../../data/buildingStore";

export const getMaxArmySize = (thLevel: number) => {
  const amountCamps = buildingStore.getMaxBuildingAmount(thLevel, "armycamp");
  const maxLevel = buildingStore.getMaxBuildingLevel(thLevel, "armycamp");
  const campInfo = buildingStore.getBuilding("armycamp", maxLevel);

  return ((campInfo?.aiSettings.capacity as number) ?? 10) * amountCamps;
};
