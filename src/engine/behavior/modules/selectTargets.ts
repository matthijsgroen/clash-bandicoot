import { TargetPreference } from "../../../data/types";
import { BattleBuildingState, BattleState } from "../../types";

export const selectTargets = (
  state: BattleState,
  preferences: TargetPreference[]
): [string, BattleBuildingState][] => {
  let targets: [string, BattleBuildingState][] = [];
  for (const pref of preferences) {
    if (targets.length === 0) {
      targets = Object.entries(state.baseData).filter(
        ([, b]) =>
          b.hitPoints > 0 &&
          b.building.info.categories.some((c) => c === pref.category)
      );
    }
  }

  if (targets.length === 0) {
    targets = Object.entries(state.baseData).filter(
      ([, b]) => b.hitPoints > 0 && b.building.info.type !== "wall" && b.visible
    );
  }
  return targets;
};
