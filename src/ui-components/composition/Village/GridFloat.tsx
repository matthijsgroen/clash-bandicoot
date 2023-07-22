import { CSSProperties, PropsWithChildren } from "react";
import styles from "./GridFloat.module.css";

interface PlacementCSS extends CSSProperties {
  "--x": number;
  "--y": number;
}

export const GridFloat: React.FC<
  PropsWithChildren<{ x: number; y: number }>
> = ({ x, y, children }) => (
  <div
    style={
      {
        "--x": x,
        "--y": y,
      } as PlacementCSS
    }
    className={styles.gridFloat}
  >
    <div className={styles.anchorPoint}>
      <div className={styles.floatingContent}>{children}</div>
    </div>
  </div>
);
