import "../data/buildings";
import React from "react";
import { useAtomValue } from "jotai";
import {
  buildingsAtom,
  effectsAtom,
  layoutAtom,
  unitsAtom,
} from "./combatState";
import {
  Building,
  Effect,
  Grid,
  Unit,
} from "../ui-components/composition/Village";
import { PlacementOutline } from "./PlacementOutline";

export const OFFSET = 3;
export const TILE_SIZE = 15;

export const Village: React.FC<{
  onClick?: (pos: [x: number, y: number]) => void;
}> = ({ onClick }) => {
  const buildings = useAtomValue(buildingsAtom);
  const units = useAtomValue(unitsAtom);
  const layout = useAtomValue(layoutAtom);
  const effects = useAtomValue(effectsAtom);
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

      {effects.map(([id, effect]) => (
        <Effect
          key={id}
          x={effect.position[0]}
          y={effect.position[1]}
          radius={effect.range}
          effectType={effect.type}
          state={effect.state}
        />
      ))}
    </Grid>
  );
};
