import styles from "./Grid.module.css";
import React, { PropsWithChildren } from "react";

export const OFFSET = 3;
export const TILE_SIZE = 15;

export const Grid: React.FC<
  PropsWithChildren<{
    width: number;
    height: number;
  }>
> = ({ width, height, children }) => {
  return (
    <div className={styles.scrollContainer}>
      <div className={styles.rotationContainer}>
        <div className={styles.tilted}>
          <div
            style={{
              width: width * TILE_SIZE,
              height: height * TILE_SIZE,
            }}
            className={styles.grid}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
