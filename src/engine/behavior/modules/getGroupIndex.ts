import { BattleState, BattleUnitState } from "../../types";

type TargetData = {
  currentTarget?: string;
};

export const getGroupIndex = (
  state: BattleState,
  unit: BattleUnitState<TargetData>
) => {
  let groupIndex = 0;
  for (const battleUnit of Object.values(state.unitData)) {
    if (battleUnit.type !== unit.type) continue;
    if (
      (battleUnit as BattleUnitState<TargetData>).unitData.currentTarget ===
      unit.unitData.currentTarget
    ) {
      groupIndex++;
    }
  }
  return groupIndex;
};
