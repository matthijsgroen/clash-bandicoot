import { buildingStore } from "../../data/buildingStore";
import { Army, getArmySize } from "../armyComposition";
import { getMaxArmySize } from "./armySize";

export const getTownhallLevel = (army: Army) => {
  let townhall = 1;

  for (const unit of army.units) {
    const g = unit.troop;
    const labNeeded = g.laboratoryRequirement;
    if (labNeeded > 0) {
      const labInfo = buildingStore.getBuilding("laboratory", labNeeded);

      if (labInfo) {
        townhall = Math.max(labInfo.thRequirement, townhall);
      }
    } else {
      const barrackNeeded = g.barrackRequirement;
      // Needs check later for normal or dark troop barrack -- same with spells
      const barrackInfo = buildingStore.getBuilding("barracks", barrackNeeded);
      if (barrackInfo) {
        townhall = Math.max(barrackInfo.thRequirement, townhall);
      }
    }
  }
  const size = getArmySize(army);
  let fit = getMaxArmySize(townhall);
  while (fit < size) {
    townhall++;
    const newFit = getMaxArmySize(townhall);
    if (newFit <= fit) {
      return townhall;
    }
    fit = newFit;
  }

  return townhall;
};
