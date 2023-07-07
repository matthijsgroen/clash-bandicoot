import { useAtomValue } from "jotai";
import { Building } from "../../ui-components/composition/Village";
import { buildingsAtom } from "../combatState";

export const Buildings: React.FC<{ showHidden?: boolean }> = ({
  showHidden = false,
}) => {
  const buildings = useAtomValue(buildingsAtom);

  return (
    <>
      {buildings
        .filter(([, buildingsState]) => showHidden || buildingsState.visible)
        .map(([id, buildingState]) => {
          const info = buildingState.building.info;
          return (
            <Building
              key={id}
              x={buildingState.building.position[0]}
              y={buildingState.building.position[1]}
              hitPoints={buildingState.hitPoints}
              buildingType={info.type}
              level={info.level}
              size={info.size[0]}
              state={buildingState.state}
            />
          );
        })}
    </>
  );
};
