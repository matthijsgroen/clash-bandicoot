import { Building } from "./Building";
import { BaseLayout, BattleBaseData } from "../../../engine/types";
import { isOverlapping, isVisible } from "../../../engine/layout/baseLayout";

export const Buildings: React.FC<{
  showHidden?: boolean;
  layout: BaseLayout;
  battleBaseData?: BattleBaseData;
  selection?: string[];
}> = ({ showHidden = false, layout, battleBaseData, selection = [] }) => {
  const buildings = Object.entries(layout.items);
  return (
    <>
      {buildings
        .filter(
          ([id, buildingsState]) =>
            showHidden ||
            isVisible(buildingsState.info) ||
            battleBaseData?.[id].visible
        )
        .map(([id, buildingState]) => {
          const info = buildingState.info;

          const battleInfo = battleBaseData?.[id];

          const hitPoints = battleInfo ? battleInfo.hitPoints : info.hitPoints;
          const state = battleInfo ? battleInfo.state : "idle";

          return (
            <Building
              key={id}
              x={buildingState.position[0]}
              y={buildingState.position[1]}
              color={info.buildingColor}
              buildingType={info.type}
              level={info.level}
              size={info.size[0]}
              attacking={state === "attacking"}
              destroyed={hitPoints === 0}
              selected={selection.includes(id)}
              overlapping={selection.includes(id) && isOverlapping(layout, id)}
            />
          );
        })}
    </>
  );
};
