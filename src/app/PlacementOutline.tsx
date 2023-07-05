import styles from "./PlacementOutline.module.css";
import { useAtomValue } from "jotai";
import { buildingsAtom } from "./combatState";
import { CSSProperties } from "react";
import classNames from "classnames";

interface PlacementCSS extends CSSProperties {
  "--x": number;
  "--y": number;
}

export const PlacementOutline = () => {
  const buildings = useAtomValue(buildingsAtom);
  return (
    <div className={styles.outlineBox}>
      {buildings.map(([id, buildingState]) => {
        const info = buildingState.building.info;
        return (
          <div
            key={`outline-${id}`}
            style={
              {
                "--x": buildingState.building.position[0],
                "--y": buildingState.building.position[1],
                position: "absolute",
              } as PlacementCSS
            }
            className={classNames(
              styles.outline,
              styles[`size${info.size[0]}`]
            )}
          ></div>
        );
      })}
    </div>
  );
};
