import { buildingStore } from "../../data/buildingStore";
import { MAX_TOWNHALL } from "../../data/consts";
import { Troop } from "../../data/types";
import { Army, getArmySize } from "./armyComposition";
import { getMaxArmySize } from "./armySize";

export const getTroopTownhallLevel = (troop: Troop): number => {
  const labNeeded = troop.laboratoryRequirement;
  if (labNeeded > 0) {
    const labInfo = buildingStore.getBuilding("laboratory", labNeeded);

    if (labInfo) {
      return labInfo.thRequirement;
    }
  } else {
    const barrackNeeded = troop.barrackRequirement;
    // Needs check later for normal or dark troop barrack -- same with spells
    const barrackInfo = buildingStore.getBuilding("barracks", barrackNeeded);
    if (barrackInfo) {
      return barrackInfo.thRequirement;
    }
  }
  return 1;
};

export const getArmyTownhallLevel = (army: Army): number => {
  let townhall = 1;

  for (const unit of army.units) {
    townhall = Math.max(getTroopTownhallLevel(unit.troop), townhall);
  }
  const size = getArmySize(army);
  let fit = getMaxArmySize(townhall);
  while (fit < size) {
    townhall++;
    if (townhall > MAX_TOWNHALL) {
      return MAX_TOWNHALL;
    }
    fit = getMaxArmySize(townhall);
  }

  return townhall;
};
