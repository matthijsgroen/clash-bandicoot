import { BattleUnitState } from "../types";

export const getDistance = (
  pos: [x: number, y: number],
  unit: BattleUnitState
) =>
  Math.sqrt(
    Math.pow(pos[0] - unit.position[0], 2) +
      Math.pow(pos[1] - unit.position[1], 2)
  );