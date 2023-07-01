import styles from "./Village.module.css";
import "../data/buildings";
import React from "react";
import classNames from "classnames";
import { BaseLayout, BattleState } from "../data/types";

export const OFFSET = 3;
export const TILE_SIZE = 15;

export const Village: React.FC<{ layout: BaseLayout; attack: BattleState }> = ({
  layout,
  attack,
}) => {
  const inProgress = attack.timeSpent < 3 * 60 * 1000;
  return (
    <div className={styles.scrollContainer}>
      <div className={styles.rotationContainer}>
        <div className={styles.tilted}>
          <div
            style={{
              width: (layout.gridSize[0] + OFFSET + OFFSET) * TILE_SIZE,
              height: (layout.gridSize[1] + OFFSET + OFFSET) * TILE_SIZE,
            }}
            className={styles.grid}
          >
            {Object.entries(attack.baseData).map(([id, buildingState], i) => {
              const info = buildingState.building.info;
              return (
                <div
                  key={id}
                  style={{
                    left:
                      (buildingState.building.position[0] + OFFSET) *
                        TILE_SIZE -
                      1,
                    top:
                      (buildingState.building.position[1] + OFFSET) *
                        TILE_SIZE -
                      1,
                    width: info.size[0] * TILE_SIZE + 1,
                    height: info.size[1] * TILE_SIZE + 1,
                    position: "absolute",
                  }}
                  className={classNames(
                    { [styles.destroyed]: buildingState.hitPoints === 0 },
                    styles.building,
                    styles[info.type],
                    styles[buildingState.state]
                  )}
                >
                  {info.type} {info.level} {buildingState.hitPoints}
                </div>
              );
            })}
            {Object.entries(attack.unitData).map(([id, unit]) => {
              return (
                <div
                  key={id}
                  style={{
                    left: (unit.position[0] + OFFSET) * TILE_SIZE - 1,
                    top: (unit.position[1] + OFFSET) * TILE_SIZE - 1,
                    width: 10,
                    height: 10,
                    position: "absolute",
                  }}
                  className={classNames(styles.unit, styles[unit.type], {
                    [styles.attacking]:
                      unit.state === "attacking" && inProgress,
                    [styles.dead]: unit.state === "dead",
                  })}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
