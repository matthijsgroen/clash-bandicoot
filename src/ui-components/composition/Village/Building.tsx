import { CSSProperties } from "react";
import classNames from "classnames";
import styles from "./Building.module.css";

interface PlacementCSS extends CSSProperties {
  "--x": number;
  "--y": number;
  "--size": number;
  "--building-color"?: CSSProperties["color"];
}

export const Building: React.FC<{
  x: number;
  y: number;
  size: number;
  className?: string;
  buildingType: string;
  level: number;
  color?: CSSProperties["color"];
  destroyed?: boolean;
  attacking?: boolean;

  selected?: boolean;
  overlapping?: boolean;
}> = ({
  x,
  y,
  size,
  className,
  level,
  buildingType,
  color,
  destroyed,
  attacking,
  // state,
  selected,
  overlapping,
}) => {
  return (
    <div
      style={
        {
          "--x": x,
          "--y": y,
          "--size": size,
          "--building-color": color,
        } as PlacementCSS
      }
      className={classNames(styles.ground, {
        [styles.selected]: selected && !overlapping,
        [styles.overlapping]: overlapping && selected,
      })}
    >
      <div
        className={classNames(
          {
            [styles.destroyed]: destroyed,
            [styles.attacking]: attacking,
            [styles[buildingType]]: styles[buildingType],
            [styles[`${buildingType}-${level}`]]:
              styles[`${buildingType}-${level}`],
            [`${className}`]: className,
            [styles.overlapping]: overlapping,
          },
          styles.building,
          styles[`size${size}`]
        )}
      >
        {buildingType} {level}
      </div>
    </div>
  );
};
