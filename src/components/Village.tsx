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
    {Object.entries(attack.baseData).map(([id, building], i) => {
      const layoutBuilding = layout.items[id];
      const info = buildingStore.getBuilding(
        building.type,
        layoutBuilding.buildingLevel
      );
      if (!info)
        return (
          <p key={i}>
            Item not found: {layoutBuilding.buildingType} level{" "}
            {layoutBuilding.buildingLevel}
          </p>
        );

      return (
        <div
          key={layoutBuilding.buildingId}
          style={{
            left: layoutBuilding.position[0] * 15 - 1,
            top: layoutBuilding.position[1] * 15 - 1,
            width: info.size[0] * 15 + 1,
            height: info.size[1] * 15 + 1,
            position: "absolute",
          }}
          className={[
            styles.building,
            styles[info.category],
            styles[layoutBuilding.buildingType],
          ].join(" ")}
        >
          {layoutBuilding.buildingType} {layoutBuilding.buildingLevel}{" "}
          {building.hitPoints}
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
