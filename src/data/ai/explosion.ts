import { BattleEffectState } from "../types";
import { getDistance } from "../utils/getDistance";
import { EntityAI } from "./type";

export const explosion: EntityAI = (state, effectId, delta) => {
  const effect = state.effectData[effectId] as BattleEffectState<{
    damage: number;
    delay: number;
  }>;
  if (effect.effectData.delay > 0) {
    effect.effectData.delay -= delta;
    if (effect.effectData.delay < 200) {
      effect.visible = true;
    }
  } else {
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
    delete state.effectData[effectId];
  }
};
