import { Troop } from "./types";

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
