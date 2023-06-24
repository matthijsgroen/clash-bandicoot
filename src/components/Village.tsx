import styles from "./Village.module.css";
import "../data/buildings";
import React from "react";
import classNames from "classnames";
import { BaseLayout, BattleState } from "../data/types";

const OFFSET = 3;

export const Village: React.FC<{ layout: BaseLayout; attack: BattleState }> = ({
  layout,
  attack,
}) => (
  <div
    style={{
      width: (layout.gridSize[0] + OFFSET + OFFSET) * 15,
      height: (layout.gridSize[1] + OFFSET + OFFSET) * 15,
    }}
    className={styles.grid}
  >
    {Object.entries(attack.baseData).map(([id, buildingState], i) => {
      const info = buildingState.building.info;
      return (
        <div
          key={id}
          style={{
            left: (buildingState.building.position[0] + OFFSET) * 15 - 1,
            top: (buildingState.building.position[1] + OFFSET) * 15 - 1,
            width: info.size[0] * 15 + 1,
            height: info.size[1] * 15 + 1,
            position: "absolute",
          }}
          className={classNames(
            { [styles.destroyed]: buildingState.hitPoints === 0 },
            styles.building,
            styles[info.category],
            styles[info.type]
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
            left: (unit.position[0] + OFFSET) * 15 - 1,
            top: (unit.position[1] + OFFSET) * 15 - 1,
            width: 10,
            height: 10,
            position: "absolute",
          }}
          className={classNames(styles.unit, styles[unit.type], {
            [styles.attacking]: unit.state === "attacking",
            [styles.dead]: unit.state === "dead",
          })}
        ></div>
      );
    })}
  </div>
);
