export type Building = {
  type: string;
  level: number;
  size: [width: number, height: number];
  thRequirement: number;
  category: "resource" | "defense" | "army" | "trap" | "other";
  cost: {
    gold: number;
    elixir: number;
    darkElixir: number;
    time: number;
  };
  hitPoints: number;
  triggerRadius?: number;

  aiType?: string;
  aiSettings?: Record<string, unknown>;
};

export type BuildingStore = {
  addBuilding: (building: Building) => void;
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
