import classNames from "classnames";
import styles from "./Effect.module.css";
import { CSSProperties } from "react";

export const OFFSET = 3;
export const TILE_SIZE = 15;

interface PlacementCSS extends CSSProperties {
  "--x": number;
  "--y": number;
  "--range": number;
}

export const Effect: React.FC<{
  x: number;
  y: number;
  state?: string;
  radius: number;
  effectType: string;
}> = ({ x, y, state, effectType, radius }) => {
  return (
    <div
      style={
        {
          "--x": x,
          "--y": y,
          "--range": radius,
        } as PlacementCSS
      }
      className={classNames(styles.effect, styles[effectType])}
    ></div>
  );
};
