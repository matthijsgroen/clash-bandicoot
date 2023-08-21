import { BattleEffectState } from "../types";
import { getDistance } from "../utils/getDistance";
import { EntityAI } from "./type";
import { applyDamage } from "./utils";

export type ExplosionEntity = BattleEffectState<{
  damage: number;
  damageDealt: boolean;
}>;

export const explosion: EntityAI = (state, effectId, delta) => {
  const effect = state.effectData[effectId] as ExplosionEntity;
  if (effect.delay > 0) {
    effect.delay -= delta;
  } else {
    if (effect.duration > 0) {
      effect.duration -= delta;
      if (!effect.effectData.damageDealt) {
        // apply damage and delete
        const inRange = Object.values(state.unitData).filter(
          (target) =>
            (effect.targetModifiers.length === 0 ||
              effect.targetModifiers.find(
                (m) => m.category === target.info.category
              )) &&
            target.hitPoints > 0 &&
            getDistance(target.position, effect.position) <= effect.range
        );
        for (const target of inRange) {
          applyDamage(target, effect.effectData.damage, state.timeSpent);
        }
        effect.effectData.damageDealt = true;
      }
    } else {
      delete state.effectData[effectId];
    }
  }
};
