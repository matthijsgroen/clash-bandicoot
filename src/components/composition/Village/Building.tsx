import { CSSProperties } from "react";
import classNames from "classnames";
import styles from "./Building.module.css";

interface PlacementCSS extends CSSProperties {
  "--x": number;
  "--y": number;
}

export const Building: React.FC<{
  x: number;
  y: number;
  size: number;
  className?: string;
  buildingType: string;
  level: number;
  hitPoints: number;
  state?: string;
}> = ({ x, y, size, className, hitPoints, level, buildingType, state }) => {
  return (
    <div
      style={
        {
          "--x": x,
          "--y": y,
          position: "absolute",
        } as PlacementCSS
      }
      className={classNames(
        {
          [styles.destroyed]: hitPoints === 0,
          [styles[state ?? "none"]]: state,
        },
        styles.building,
        styles[`size${size}`],
        styles[buildingType],
        className
      )}
    >
      {buildingType} {level} {hitPoints}
    </div>
  );
};
