import "../../data/troops";
import { troopStore } from "../../data/troopStore";
import { Troop, TroopType } from "../../data/types";

export const elixirTroops: TroopType[] = [
  "barbarian",
  "archer",
  "giant",
  "goblin",
  "wallbreaker",
  "balloon",
];

export const darkElixirTroops: string[] = [];
export const heros: string[] = [];
export const spells: string[] = [];
export const darkSpells: string[] = [];

export const categories = {
  elixirTroops,
  darkElixirTroops,
  heros,
  spells,
  darkSpells,
};

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
  unitType: TroopType,
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

export const removeTroop = (
  army: Army,
  unitType: TroopType,
  level: number,
  amount = 1
): Army => {
  let toRemove = amount;
  return {
    ...army,
    units: army.units.filter((unit) => {
      const match =
        unit.troop.type === unitType &&
        unit.troop.level === level &&
        unit.state === "ready";
      if (match && toRemove > 0) {
        toRemove--;
        return false;
      }
      return true;
    }),
  };
};

export const getArmySize = (army: Army) =>
  army.units.reduce((size, unit) => size + unit.troop.size, 0);

export const getPlacementOverview = (army: Army) => {
  const placement: {
    type: TroopType;
    level: number;
    available: number;
    category: string;
    categoryIndex: number;
  }[] = [];

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
): [Army, ArmyTroop | null] => {
  let placed: ArmyTroop | null = null;
  const update: Army = {
    ...army,
    units: army.units.map((unit) => {
      if (
        !placed &&
        unit.troop.type === unitType &&
        unit.troop.level === unitLevel &&
        unit.state === "ready"
      ) {
        placed = {
          ...unit,
          state: "placed",
        };
        return placed;
      }
      return unit;
    }),
  };
  return placed ? [update, placed] : [army, null];
};

export const canDeployTroops = (army: Army) =>
  army.units.some((u) => u.state === "ready");

export const armyBuilder = () => {
  let result = createArmy();

  const builder = {
    addTroops: (type: TroopType, lvl: number, amount = 1) => {
      result = addTroop(result, type, lvl, amount);
      return builder;
    },
    placeTroop: (type: string, lvl: number) => {
      result = placeUnit(result, type, lvl)[0];
      return builder;
    },
    result: () => result,
  };
  return builder;
};
