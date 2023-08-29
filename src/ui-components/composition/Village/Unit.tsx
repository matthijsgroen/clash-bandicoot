import classNames from "classnames";
import styles from "./Unit.module.css";
import { CSSProperties } from "react";

export const TILE_SIZE = 15;

interface UnitCSS extends CSSProperties {
  "--color": CSSProperties["color"];
}
export const Unit: React.FC<{
  x: number;
  y: number;
  state?: string;
  unitType: string;
  unitMode?: "ground" | "air";
  color: CSSProperties["color"];
}> = ({ x, y, state, unitType, color, unitMode = "ground" }) => {
  return (
    <div
      style={
        {
          left: x * TILE_SIZE - 1,
          top: y * TILE_SIZE - 1,
          width: 5,
          height: 5,
          position: "absolute",
          "--color": color,
        } as UnitCSS
      }
      className={classNames(styles.unit, styles[unitType], {
        [styles.attacking]: state === "attacking",
        [styles.dead]: state === "dead",
        [styles.air]: state !== "dead" && unitMode === "air",
      })}
    ></div>
  );
};
