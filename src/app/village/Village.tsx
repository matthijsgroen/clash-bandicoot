import "../../data/buildings";
import React from "react";
import { useAtomValue } from "jotai";
import { layoutAtom } from "../combatState";
import { Grid } from "../../ui-components/composition/Village";
import { PlacementOutline } from "./PlacementOutline";
import { Buildings } from "./Buildings";
import { Units } from "./Units";

export const OFFSET = 3;
export const TILE_SIZE = 15;

export const Village: React.FC<{
  onClick?: (pos: [x: number, y: number]) => void;
}> = ({ onClick }) => {
  const layout = useAtomValue(layoutAtom);
  return (
    <Grid
      width={layout.gridSize[0]}
      height={layout.gridSize[1]}
      onClick={onClick}
    >
      <PlacementOutline mode="dark" />
      <Buildings />
      <Units />
    </Grid>
  );
};
