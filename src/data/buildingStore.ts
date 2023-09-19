import { MAX_TOWNHALL } from "./consts";
import { Building, BuildingLimit } from "./types";

export type BuildingStore = {
  addBuilding: <Settings extends Record<string, unknown>>(
    building: Building<Settings>
  ) => void;
  getBuilding: (type: string, level: number) => Building | undefined;
  setBuildingLimit: (type: string, amount: number, thLevel: number) => void;
  getMaxBuildingAmount: (thLevel: number, type: string) => number;
  getMaxBuildingLevel: (thLevel: number, type: string) => number;
  getBuildingTypeList: () => string[];
};

export const createBuildingStore = (): BuildingStore => {
  const buildings: Building[] = [];
  const limits: BuildingLimit[] = [];
  const buildingTypeList: string[] = [];

  return {
    addBuilding: (building) => {
      if (building.thRequirement > MAX_TOWNHALL) return;
      buildings.push(building);
      if (!buildingTypeList.includes(building.type)) {
        buildingTypeList.push(building.type);
      }
    },
    getBuilding: (type, level) =>
      buildings.find((b) => b.type === type && b.level === level),
    setBuildingLimit: (type, amount, thLevel) => {
      limits.push({ thLevel, type, amount });
    },
    getMaxBuildingAmount(thLevel, type) {
      let limit = 0;
      limits.forEach((e) => {
        if (thLevel >= e.thLevel && type === e.type && e.amount > limit) {
          limit = e.amount;
        }
      });
      return limit;
    },
    getMaxBuildingLevel(thLevel, type) {
      let level = 0;
      buildings.forEach((building) => {
        if (
          thLevel >= building.thRequirement &&
          type === building.type &&
          building.level > level
        ) {
          level = building.level;
        }
      });
      return level;
    },
    getBuildingTypeList() {
      return buildingTypeList;
    },
  };
};

export const buildingStore = createBuildingStore();
