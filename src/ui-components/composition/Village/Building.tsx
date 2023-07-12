import { CSSProperties } from "react";
import classNames from "classnames";
import styles from "./Building.module.css";

interface PlacementCSS extends CSSProperties {
  "--x": number;
  "--y": number;
  "--size": number;
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
  selected?: boolean;
}> = ({
  x,
  y,
  size,
  className,
  hitPoints,
  level,
  buildingType,
  state,
  selected,
}) => {
  return (
    <div
      style={
        {
          "--x": x,
          "--y": y,
          "--size": size,
          position: "absolute",
        } as PlacementCSS
      }
      className={classNames(styles.ground, { [styles.selected]: selected })}
    >
      <div
        className={classNames(
          {
            [styles.destroyed]: hitPoints === 0,
            [styles[state ?? "none"]]: state,
            [styles[buildingType]]: styles[buildingType],
            [`${className}`]: className,
          },
          styles.building,
          styles[`size${size}`]
        )}
      >
        {buildingType} {level} {hitPoints}
      </div>
    </div>
  );
};
