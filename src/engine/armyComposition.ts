import "../data/troops";
import { troopStore } from "../data/troopStore";
import { Troop } from "../data/types";

export const elixirTroops = ["barbarian", "archer", "giant", "goblin"];
export const darkElixirTroops = [];
export const heros = [];
export const spells = [];
export const darkSpells = [];

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
  const placement: {
    type: string;
    level: number;
    available: number;
    category: string;
    categoryIndex: number;
  }[] = [];

  const categories = {
    elixirTroops,
    darkElixirTroops,
    heros,
    spells,
    darkSpells,
  };

  army.units.forEach((unit) => {
    const index = placement.findIndex(
      (e) => e.type === unit.troop.type && e.level === unit.troop.level
    );

    const category = Object.entries(categories).find(([, c]) =>
      c.some((u) => u === unit.troop.type)
    );

    if (index === -1) {
      placement.push({
        type: unit.troop.type,
        level: unit.troop.level,
        available: unit.state === "ready" ? 1 : 0,
        category: category?.[0] ?? "unknown",
        categoryIndex:
          (category?.[1] as string[]).indexOf(unit.troop.type) ?? -1,
      });
    } else if (unit.state === "ready") {
      placement[index].available++;
    }
  });
  const catKeys = Object.keys(categories);

  return placement.sort((a, b) => {
    const aCatIndex = catKeys.indexOf(a.category);
    const bCatIndex = catKeys.indexOf(a.category);
    if (aCatIndex !== bCatIndex) {
      return aCatIndex - bCatIndex;
    }
    if (a.categoryIndex !== b.categoryIndex) {
      return a.categoryIndex - b.categoryIndex;
    }
    if (a.level !== b.level) {
      return b.level - a.level;
    }
    return 0;
  });
};

export const placeUnit = (
  army: Army,
  unitType: string,
  unitLevel: number
): Army => {
  let placed = false;
  const update: Army = {
    units: army.units.map((unit) => {
      if (
        !placed &&
        unit.troop.type === unitType &&
        unit.troop.level === unitLevel &&
        unit.state === "ready"
      ) {
        placed = true;
        return {
          ...unit,
          state: "placed",
        };
      }
      return unit;
    }),
  };
  return placed ? update : army;
};

export const canDeployTroops = (army: Army) =>
  army.units.some((u) => u.state === "ready");

export const armyBuilder = () => {
  let result = createArmy();

  const builder = {
    addTroops: (type: string, lvl: number, amount = 1) => {
      result = addTroop(result, type, lvl, amount);
      return builder;
    },
    placeTroop: (type: string, lvl: number) => {
      result = placeUnit(result, type, lvl);
      return builder;
    },
    result: () => result,
  };
  return builder;
};
