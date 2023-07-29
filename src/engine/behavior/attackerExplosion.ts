import { BattleEffectState } from "../types";
import { inRange } from "./modules/getPaths";
import { EntityAI } from "./type";
import { applyDamage } from "./utils";

export type ExplosionEntity = BattleEffectState<{
  damage: number;
  damageDealt: boolean;
}>;

export const attackerExplosion: EntityAI = (state, effectId, delta) => {
  const effect = state.effectData[effectId] as ExplosionEntity;
  if (effect.delay > 0) {
    effect.delay -= delta;
  } else {
    if (effect.duration > 0) {
      effect.duration -= delta;
      if (!effect.effectData.damageDealt) {
        // apply damage and delete
        const targets = Object.values(state.baseData).filter(
          (target) =>
            target.hitPoints > 0 &&
            inRange(target, effect.position, effect.range)
        );
        for (const target of targets) {
          const modifier = effect.targetModifiers.find((m) =>
            target.building.info.categories.includes(m.category)
          );
          const factor = modifier ? modifier.multiplier ?? 1 : 1;
          applyDamage(
            target,
            effect.effectData.damage * factor,
            state.timeSpent
          );
        }

        effect.effectData.damageDealt = true;
      }
    } else {
      delete state.effectData[effectId];
    }
  }
};
