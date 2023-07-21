import { Building } from "./Building";
import { BaseLayout, BattleBaseData } from "../../../engine/types";
import { isOverlapping, isVisible } from "../../../engine/layout/baseLayout";
import { Text } from "../../atoms/Text";

export const Buildings: React.FC<{
  showHidden?: boolean;
  layout: BaseLayout;
  battleBaseData?: BattleBaseData;
  selection?: string[];
  showSelectedDetails?: boolean;
}> = ({
  showHidden = false,
  layout,
  battleBaseData,
  selection = [],
  showSelectedDetails = false,
}) => {
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
          const showDetails = showSelectedDetails && id === selection[0];

          return (
            <Building
              key={id}
              x={buildingState.position[0]}
              y={buildingState.position[1]}
              hitPoints={hitPoints}
              buildingType={info.type}
              level={info.level}
              size={info.size[0]}
              state={state}
              selected={selection.includes(id)}
              overlapping={selection.includes(id) && isOverlapping(layout, id)}
              floatingContent={
                showDetails ? (
                  <>
                    <Text centered element="h1" color="palegreen">
                      {info.type}
                    </Text>
                    <Text centered size="small" color="springgreen">
                      level {info.level}
                    </Text>
                  </>
                ) : undefined
              }
            />
          );
        })}
    </>
  );
};
