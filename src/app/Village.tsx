import "../data/buildings";
import React from "react";
import { useAtomValue } from "jotai";
import { buildingsAtom, layoutAtom, unitsAtom } from "./combatState";
import { Grid } from "../ui-components/composition/Village";
import { Building } from "../ui-components/composition/Village/Building";
import { Unit } from "../ui-components/composition/Village/Unit";
import { PlacementOutline } from "./PlacementOutline";

export const OFFSET = 3;
export const TILE_SIZE = 15;

export const Village: React.FC<{
  onClick?: (pos: [x: number, y: number]) => void;
}> = ({ onClick }) => {
  const buildings = useAtomValue(buildingsAtom);
  const units = useAtomValue(unitsAtom);
  const layout = useAtomValue(layoutAtom);
  return (
    <Grid
      width={layout.gridSize[0]}
      height={layout.gridSize[1]}
      onClick={onClick}
    >
      <PlacementOutline />

      {buildings.map(([id, buildingState]) => {
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

      {units.map(([id, unit]) => (
        <Unit
          key={id}
          x={unit.position[0]}
          y={unit.position[1]}
          unitType={unit.info.type}
          state={unit.state}
        />
      ))}
    </Grid>
  );
};
