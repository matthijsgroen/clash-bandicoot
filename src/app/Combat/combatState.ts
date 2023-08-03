import { atom } from "jotai";
import { createBattleState } from "../../engine/combat/attack";
import { newLayout } from "../../engine/layout/baseLayout";
import { createArmy } from "../../engine/armyComposition";

export const battleAtom = atom(createBattleState(newLayout(), createArmy()));

export const armyAtom = atom((get) => {
  const state = get(battleAtom);
  return state.army;
});

export const battleStateAtom = atom((get) => {
  const state = get(battleAtom);
  return state.state;
});
