import { buildingStore } from "../../data/buildingStore";
import { BaseLayout } from "../types";
import { getTownhallLevel } from "./baseLayout";
import { buildingList } from "./compressList";

export const getBuildingTypesAndAvailableAmount = (base: BaseLayout) => {
  const townHallLevel = Math.max(getTownhallLevel(base), 1);

  const typesAndAvailable: Record<string, number> = buildingList.reduce(
    (r, buildingType) => {
      const amountUsed = Object.values(base.items).reduce(
        (r, e) => (e.info.type === buildingType ? r + 1 : r),
        0
      );
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
    },
    {} as Record<string, number>
  );
  return typesAndAvailable;
};
