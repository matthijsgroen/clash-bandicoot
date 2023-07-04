import styles from "./Village.module.css";
import "../data/buildings";
import React, { CSSProperties } from "react";
import classNames from "classnames";
import { BaseLayout, BattleState } from "../data/types";
import { createInitialBaseData } from "../data/combat/attack";

export const OFFSET = 3;
export const TILE_SIZE = 15;

export interface PlacementCSS extends CSSProperties {
  "--x": number;
  "--y": number;
}

export const Village: React.FC<{
  layout: BaseLayout;
  attack?: BattleState;
}> = ({ layout, attack }) => {
  const inProgress = attack && attack.timeSpent < 3 * 60 * 1000;
  const baseData = attack ? attack.baseData : createInitialBaseData(layout);
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
            {Object.entries(baseData).map(([id, buildingState], i) => {
              const info = buildingState.building.info;
              return (
                <div
                  key={id}
                  style={
                    {
                      "--x": buildingState.building.position[0],
                      "--y": buildingState.building.position[1],
                      position: "absolute",
                    } as PlacementCSS
                  }
                  className={classNames(
                    { [styles.destroyed]: buildingState.hitPoints === 0 },
                    styles.building,
                    styles[info.type],
                    styles[`size${info.size[0]}`],
                    styles[buildingState.state]
                  )}
                >
                  {info.type} {info.level} {buildingState.hitPoints}
                </div>
              );
            })}
            {attack &&
              Object.entries(attack.unitData).map(([id, unit]) => {
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
