import { BaseLayout } from "../data/baseLayout";
import styles from "./Village.module.css";
import "../data/buildings";
import { buildingStore } from "../data/buildingStore";
import React from "react";
import { GameState } from "../data/attack";

export const Village: React.FC<{ layout: BaseLayout; attack: GameState }> = ({
  layout,
  attack,
}) => (
  <div
    style={{
      width: layout.gridSize[0] * 15,
      height: layout.gridSize[1] * 15,
    }}
    className={styles.grid}
  >
    {Object.entries(attack.baseData).map(([id, buildingState], i) => {
      const info = buildingStore.getBuilding(
        buildingState.building.buildingType,
        buildingState.building.buildingLevel
      );
      if (!info)
        return (
          <p key={i}>
            Item not found: {buildingState.building.buildingType} level{" "}
            {buildingState.building.buildingLevel}
          </p>
        );

      return (
        <div
          key={id}
          style={{
            left: buildingState.building.position[0] * 15 - 1,
            top: buildingState.building.position[1] * 15 - 1,
            width: info.size[0] * 15 + 1,
            height: info.size[1] * 15 + 1,
            position: "absolute",
          }}
          className={[
            styles.building,
            styles[info.category],
            styles[buildingState.building.buildingType],
          ].join(" ")}
        >
          {buildingState.building.buildingType}{" "}
          {buildingState.building.buildingLevel} {buildingState.hitPoints}
        </div>
      );
    })}
    {Object.entries(attack.unitData).map(([id, unit]) => {
      return (
        <div
          key={id}
          style={{
            left: unit.position[0] * 15 - 1,
            top: unit.position[1] * 15 - 1,
            width: 10,
            height: 10,
            position: "absolute",
          }}
          className={[styles.unit, styles[unit.type]].join(" ")}
        ></div>
      );
    })}
  </div>
);
