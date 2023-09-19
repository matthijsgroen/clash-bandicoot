import { buildingStore } from "../../data/buildingStore";
import { BaseLayout } from "../types";
import { getTownhallLevel } from "./baseLayout";

export const getAmountBuildingsUsed = (
  base: BaseLayout,
  buildingType: string
): number =>
  Object.values(base.items).reduce(
    (r, e) => (e.info.type.split(":")[0] === buildingType ? r + 1 : r),
    0
  );

export const getBuildingTypesAndAvailableAmount = (base: BaseLayout) => {
  const townHallLevel = Math.max(getTownhallLevel(base), 1);

  const typesAndAvailable: Record<string, number> = buildingStore
    .getBuildingTypeList()
    .reduce((r, buildingType) => {
      const amountUsed = getAmountBuildingsUsed(base, buildingType);
      const amountAvailable = buildingStore.getMaxBuildingAmount(
        townHallLevel,
        buildingType
      );

      if (amountAvailable > 0) {
        return {
          ...r,
          [buildingType]: amountAvailable - amountUsed,
        };
      }
      return r;
    }, {} as Record<string, number>);
  return typesAndAvailable;
};
