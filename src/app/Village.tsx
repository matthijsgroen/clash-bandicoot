import "../data/buildings";
import React from "react";
import { atom, useAtomValue } from "jotai";
import { battleAtom, layoutAtom } from "./combatState";
import { Grid } from "../components/composition/Village";
import { Building } from "../components/composition/Village/Building";
import { Unit } from "../components/composition/Village/Unit";

export const OFFSET = 3;
export const TILE_SIZE = 15;

const buildingsAtom = atom((get) => {
  const attack = get(battleAtom);
  return Object.entries(attack.baseData);
});

const unitsAtom = atom((get) => {
  const attack = get(battleAtom);
  return Object.entries(attack.unitData);
});

export const Village: React.FC = () => {
  const buildings = useAtomValue(buildingsAtom);
  const units = useAtomValue(unitsAtom);
  const layout = useAtomValue(layoutAtom);
  return (
    <Grid width={layout.gridSize[0]} height={layout.gridSize[1]}>
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
