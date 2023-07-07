import { BattleEffectState } from "../types";
import { getDistance } from "../utils/getDistance";
import { EntityAI } from "./type";

export const explosion: EntityAI = (state, effectId, delta) => {
  const effect = state.effectData[effectId] as BattleEffectState<{
    damage: number;
    damageDealt: boolean;
  }>;
  if (effect.delay > 0) {
    effect.delay -= delta;
  } else {
    if (effect.duration > 0) {
      effect.duration -= delta;
      if (!effect.effectData.damageDealt) {
        // apply damage and delete
        const inRange = Object.values(state.unitData).filter(
          (target) =>
            target.info.category === "ground" &&
            target.hitPoints > 0 &&
            getDistance(target.position, effect.position) <= effect.range
        );
        for (const target of inRange) {
          target.hitPoints -= effect.effectData.damage;
        }
        effect.effectData.damageDealt = true;
      }
    } else {
      delete state.effectData[effectId];
    }
  }
};
