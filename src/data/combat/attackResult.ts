import { BattleBaseData } from "../types";

export const getDestruction = (baseData: BattleBaseData): number => {
  let buildingHealth = 0;
  let buildingsDestroyed = 0;

  Object.values(baseData).forEach(({ hitPoints, building }) => {
    if (building.info.categories.some((c) => c === "wall" || c === "trap")) {
      return;
    }
    buildingHealth += building.info.hitPoints;
    if (hitPoints === 0) {
      buildingsDestroyed += building.info.hitPoints;
    }
  });

  if (buildingHealth === 0) return 0;
  return buildingsDestroyed / buildingHealth;
};

const isTownHallDestroyed = (baseData: BattleBaseData): boolean =>
  Object.values(baseData).some(
    ({ hitPoints, building }) =>
      hitPoints === 0 && building.info.type === "townhall"
  );

export const getStars = (baseData: BattleBaseData): number => {
  let stars = 0;
  if (isTownHallDestroyed(baseData)) {
    stars++;
  }
  const destruction = getDestruction(baseData);
  if (destruction >= 0.5) {
    stars++;
  }
  if (destruction >= 1.0) {
    stars++;
  }
  return stars;
};
