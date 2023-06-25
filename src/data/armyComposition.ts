import { Troop } from "./types";
import "./troops";
import { troopStore } from "./troopStore";

export const knownTroopTypes = ["barbarian", "archer"];

export type ArmyTroop = {
  troop: Troop;
  state: "placed" | "ready";
};

export type Army = {
  units: ArmyTroop[];
};

export const createArmy = (): Army => ({ units: [] });

export const addTroop = (
  army: Army,
  unitType: string,
  level: number,
  amount = 1
): Army => {
  const troop = troopStore.getTroop(unitType, level);
  if (!troop) {
    return army;
  }
  return {
    ...army,
    units: army.units.concat(
      Array(amount)
        .fill(0)
        .map(() => ({ troop, state: "ready" }))
    ),
  };
};

export const getArmySize = (army: Army) =>
  army.units.reduce((size, unit) => size + unit.troop.size, 0);

export const getPlacementOverview = (army: Army) => {
  const placement: { type: string; level: number; available: number }[] = [];
  army.units.forEach((unit) => {
    if (unit.state === "ready") {
      const index = placement.findIndex(
        (e) => e.type === unit.troop.type && e.level === unit.troop.level
      );
      if (index === -1) {
        placement.push({
          type: unit.troop.type,
          level: unit.troop.level,
          available: 1,
        });
      } else {
        placement[index].available++;
      }
    }
  });

  return placement;
};

export const armyBuilder = () => {
  let result = createArmy();

  const builder = {
    addTroops: (type: string, lvl: number, amount = 1) => {
      result = addTroop(result, type, lvl, amount);
      return builder;
    },
    result: () => result,
  };
  return builder;
};
