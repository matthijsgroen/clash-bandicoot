import { getTroopTownhallLevel } from "../engine/army/townhallLevel";
import { MAX_TOWNHALL } from "./consts";
import { Troop, TroopType } from "./types";

export type TroopStore = {
  addTroop: (troop: Troop) => void;
  getTroop: (type: TroopType, level: number) => Troop | undefined;
};

export const createTroopStore = (): TroopStore => {
  const troops: Troop[] = [];

  return {
    addTroop: (troop) => {
      if (getTroopTownhallLevel(troop) > MAX_TOWNHALL) return;
      troops.push(troop);
    },
    getTroop: (type, level) =>
      troops.find((b) => b.type === type && b.level === level),
  };
};

export const troopStore = createTroopStore();
