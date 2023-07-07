export const applyDamage = (target: { hitPoints: number }, damage: number) => {
  target.hitPoints = Math.max(target.hitPoints - damage, 0);
};
