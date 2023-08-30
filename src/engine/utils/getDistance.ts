import { LayoutBuilding, Position } from "../types";

export const getDistance = ([x1, y1]: Position, [x2, y2]: Position) =>
  Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));

export const getBuildingDistance = (
  building: LayoutBuilding,
  [px, py]: Position
): number => {
  const [bx, by] = building.position;

  const dx = Math.max(bx - px, 0, px - (bx + building.info.size[0]));
  const dy = Math.max(by - py, 0, py - (by + building.info.size[1]));
  return Math.sqrt(dx * dx + dy * dy);
};
