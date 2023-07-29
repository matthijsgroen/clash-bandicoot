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
            // [styles[state ?? "none"]]: state,
            [styles[buildingType]]: styles[buildingType],
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
