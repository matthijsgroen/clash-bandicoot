export const applyDamage = (
  target: { hitPoints: number; lastHitAt: number },
  damage: number,
  time: number
) => {
  target.hitPoints = Math.max(target.hitPoints - damage, 0);
  target.lastHitAt = time;
};
