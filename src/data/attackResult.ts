import { BaseData } from "./attack";

export const getDestruction = (baseData: BaseData): number => {
  let buildingHealth = 0;
  let buildingsDestroyed = 0;

  Object.values(baseData).forEach(({ hitPoints, maxHitPoints }) => {
    buildingHealth += maxHitPoints;
    if (hitPoints === 0) {
      buildingsDestroyed += maxHitPoints;
    }
  });

  if (buildingHealth === 0) return 0;
  return buildingsDestroyed / buildingHealth;
};

const isTownHallDestroyed = (baseData: BaseData): boolean =>
  Object.values(baseData).some(
    ({ hitPoints, type }) => hitPoints === 0 && type === "townhall"
  );

export const getStars = (baseData: BaseData): number => {
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
