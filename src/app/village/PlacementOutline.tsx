import styles from "./PlacementOutline.module.css";
import { useAtomValue } from "jotai";
import { buildingsAtom } from "../combatState";
import { CSSProperties } from "react";
import classNames from "classnames";

interface PlacementCSS extends CSSProperties {
  "--x": number;
  "--y": number;
}

export const PlacementOutline: React.FC<{ mode?: "dark" | "light" }> = ({
  mode = "dark",
}) => {
  const buildings = useAtomValue(buildingsAtom);
  return (
    <div
      className={classNames(styles.outlineBox, {
        [styles.light]: mode === "light",
        [styles.dark]: mode === "dark",
      })}
    >
      {buildings
        .filter(([, buildingsState]) => buildingsState.visible)
        .map(([id, buildingState]) => {
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
