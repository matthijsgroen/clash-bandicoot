import { Cost } from "./types";

export type TargetPreference = "defense" | "resource" | "wall" | "air-defense";

export type Troop = {
  type: string;
  level: number;
  size: number;
  category: "ground" | "air";
  movementSpeed: number;
  attackSpeed: number;
  damage: number;

  barrackRequirement: number;
  laboratoryRequirement: number;

  targetPreference: TargetPreference[];
  trainingTime: number;

  researchCost: Cost;

  hitPoints: number;
  hitRadius: number;

  aiType?: string;
  aiSettings?: Record<string, unknown>;
};

export type TroopStore = {
  addTroop: (troop: Troop) => void;
  getTroop: (type: string, level: number) => Troop | undefined;
};

export const createTroopStore = (): TroopStore => {
  const troops: Troop[] = [];

  return {
    addTroop: (troop) => {
      troops.push(troop);
    },
    getTroop: (type, level) =>
      troops.find((b) => b.type === type && b.level === level),
  };
};

export const troopStore = createTroopStore();
