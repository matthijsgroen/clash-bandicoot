import styles from "./PlacementOutline.module.css";
import { CSSProperties } from "react";
import classNames from "classnames";
import { BaseLayout } from "../../../engine/types";
import { isVisible } from "../../../engine/layout/baseLayout";

interface PlacementCSS extends CSSProperties {
  "--x": number;
  "--y": number;
}

export const PlacementOutline: React.FC<{
  layout: BaseLayout;
  mode?: "dark" | "light";
}> = ({ layout, mode = "dark" }) => {
  const buildings = Object.entries(layout.items);
  return (
    <div
      className={classNames(styles.outlineBox, {
        [styles.light]: mode === "light",
        [styles.dark]: mode === "dark",
      })}
    >
      {buildings
        .filter(([, buildingsState]) => isVisible(buildingsState.info))
        .map(([id, buildingState]) => {
          const info = buildingState.info;
          return (
            <div
              key={`outline-${id}`}
              style={
                {
                  "--x": buildingState.position[0],
                  "--y": buildingState.position[1],
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
