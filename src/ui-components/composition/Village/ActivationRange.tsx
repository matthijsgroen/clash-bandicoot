import { CSSProperties } from "react";
import styles from "./ActivationRange.module.css";
import classNames from "classnames";

interface PlacementCSS extends CSSProperties {
  "--x": number;
  "--y": number;
  "--max-range": number;
  "--min-range": number;
}

export const ActivationRange: React.FC<{
  x: number;
  y: number;
  maxRange: number;
  minRange?: number;
}> = ({ x, y, maxRange, minRange }) => (
  <div
    style={
      {
        "--x": x,
        "--y": y,
        "--max-range": maxRange,
        "--min-range": minRange,
      } as PlacementCSS
    }
    className={classNames(styles.activationRange, {
      [styles.minRange]: minRange && minRange > 0,
    })}
  ></div>
);
