import { Building } from "./types";

export type BuildingStore = {
  addBuilding: <Settings extends Record<string, unknown>>(
    building: Building<Settings>
  ) => void;
  getBuilding: (type: string, level: number) => Building | undefined;
};

export const createBuildingStore = (): BuildingStore => {
  const buildings: Building[] = [];

  return {
    addBuilding: (building) => {
      buildings.push(building);
    },
    getBuilding: (type, level) =>
      buildings.find((b) => b.type === type && b.level === level),
  };
};

export const buildingStore = createBuildingStore();
