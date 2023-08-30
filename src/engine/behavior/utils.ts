import { BattleState, Position } from "../types";

export const applyDamage = (
  target: { hitPoints: number; lastHitAt: number },
  damage: number,
  time: number
) => {
  target.hitPoints = Math.max(target.hitPoints - damage, 0);
  target.lastHitAt = time;
};

export const applyBuildingDamage = (
  targetId: string,
  state: BattleState,
  damage: number,
  time: number
) => {
  const building = state.baseData[targetId];
  state.baseData[targetId] = {
    ...building,
    hitPoints: Math.max(building.hitPoints - damage, 0),
    lastHitAt: time,
  };
};

export const floorPosition = (position: Position): Position =>
  position.map(Math.floor) as Position;

export const shiftPosition = (
  a: Position,
  b: Position,
  shift: number
): Position => {
  const dx = Math.abs(a[0] - b[0]);
  const dy = Math.abs(a[1] - b[1]);

  return [a[0] + dx * shift, a[1] + dy * shift];
};
