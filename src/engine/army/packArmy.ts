import { pack as packArmy, unpack as unpackArmy } from "../utils/pack";
import { TroopType } from "../../data/types";
import {
  addTroop,
  categories,
  createArmy,
  getPlacementOverview,
} from "./armyComposition";
import { Army } from "./types";

export const compressArmy = (army: Army): Uint8Array => {
  const result: number[] = [];

  const troopOverview = getPlacementOverview(army);

  for (const group of Object.keys(categories) as (keyof typeof categories)[]) {
    const groupCompressed: number[] = [];
    const category = categories[group];
    let counter = 0;
    for (const unitType of category) {
      for (const placement of troopOverview.filter(
        (u) => u.type === unitType
      )) {
        groupCompressed.push(
          category.indexOf(placement.type),
          placement.level,
          placement.available
        );
        counter++;
      }
    }
    groupCompressed.unshift(counter);
    result.push(...groupCompressed);
  }

  return Uint8Array.from(result);
};

export const decompressArmy = (buffer: Uint8Array): Army => {
  const bytes = [...buffer];
  let army = createArmy();

  for (const group of Object.keys(categories) as (keyof typeof categories)[]) {
    const category = categories[group];
    let unitCount = bytes.shift() ?? 0;
    while (unitCount > 0) {
      const typeIndex = bytes.shift() ?? 0;
      const level = bytes.shift() ?? 1;
      const amount = bytes.shift() ?? 1;
      const unitType = category[typeIndex] as TroopType;

      army = addTroop(army, unitType, level, amount);

      unitCount--;
    }
  }

  return army;
};

export const pack = (army: Army): string => packArmy(compressArmy(army));

export const unpack = (string: string): Army =>
  decompressArmy(unpackArmy(string));
