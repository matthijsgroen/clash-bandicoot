import classNames from "classnames";
import styles from "./Unit.module.css";

export const TILE_SIZE = 15;

export const Unit: React.FC<{
  x: number;
  y: number;
  state?: string;
  unitType: string;
}> = ({ x, y, state, unitType }) => {
  return (
    <div
      style={{
        left: x * TILE_SIZE - 1,
        top: y * TILE_SIZE - 1,
        width: 5,
        height: 5,
        position: "absolute",
      }}
      className={classNames(styles.unit, styles[unitType], {
        [styles.attacking]: state === "attacking",
        [styles.dead]: state === "dead",
      })}
    ></div>
  );
};
