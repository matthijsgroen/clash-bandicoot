import { BaseLayout } from "../data/baseLayout";
import styles from "./Village.module.css";
import "../data/buildings";
import { buildingStore } from "../data/buildingStore";
import React from "react";

export const Village: React.FC<{ layout: BaseLayout }> = ({ layout }) => (
  <div
    style={{
      width: layout.gridSize[0] * 15,
      height: layout.gridSize[1] * 15,
    }}
    className={styles.grid}
  >
    {Object.values(layout.items).map((layoutBuilding, i) => {
      const info = buildingStore.getBuilding(
        layoutBuilding.buildingType,
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
          key={i}
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
          {layoutBuilding.buildingType} {layoutBuilding.buildingLevel}
        </div>
      );
    })}
  </div>
);
