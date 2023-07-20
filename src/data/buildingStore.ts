import { Building, BuildingLimit } from "./types";

export type BuildingStore = {
  addBuilding: <Settings extends Record<string, unknown>>(
    building: Building<Settings>
  ) => void;
  getBuilding: (type: string, level: number) => Building | undefined;
  setBuildingLimit: (type: string, amount: number, thLevel: number) => void;
  getMaxBuildingAmount: (thLevel: number, type: string) => number;
  getMaxBuildingLevel: (thLevel: number, type: string) => number;
};

export const createBuildingStore = (): BuildingStore => {
  const buildings: Building[] = [];
  const limits: BuildingLimit[] = [];

  return {
    addBuilding: (building) => {
      buildings.push(building);
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
  };
};

export const buildingStore = createBuildingStore();
