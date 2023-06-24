import { Cost } from "./types";

export type Building<
  Settings extends Record<string, unknown> = Record<string, unknown>
> = {
  type: string;
  level: number;
  size: [width: number, height: number];
  thRequirement: number;
  category: "resource" | "defense" | "army" | "trap" | "other";
  cost: Cost;
  hitPoints: number;
  triggerRadius?: number;

  aiType?: string;
  aiSettings: Settings;
};

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
