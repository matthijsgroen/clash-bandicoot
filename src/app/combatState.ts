import { atom } from "jotai";
import { createBattleState } from "../engine/combat/attack";
import { newLayout } from "../engine/layout/baseLayout";
import { createArmy } from "../engine/armyComposition";

export const battleAtom = atom(createBattleState(newLayout(), createArmy()));
export const armyAtom = atom((get) => {
  const state = get(battleAtom);
  return state.army;
});

export const layoutAtom = atom((get) => {
  const state = get(battleAtom);
  return state.layout;
});

export const buildingsAtom = atom((get) => {
  const attack = get(battleAtom);
  return Object.entries(attack.baseData);
});

export const unitsAtom = atom((get) => {
  const attack = get(battleAtom);
  return Object.entries(attack.unitData);
});

export const effectsAtom = atom((get) => {
  const attack = get(battleAtom);
  return Object.entries(attack.effectData).filter(
    ([, effect]) => effect.delay <= 0
  );
});
