import { troopStore } from "../../data/troopStore";
import { TroopType } from "../../data/types";
import { Army } from "./armyComposition";

export const setUnitTypeLevel = (
  army: Army,
  type: TroopType,
  level: number
): Army => {
  const targetTroop = troopStore.getTroop(type, level);
  if (!targetTroop) {
    return army;
  }

  return {
    ...army,
    units: army.units.map((u) =>
      u.troop.type === type ? { ...u, troop: targetTroop } : u
    ),
  };
};
