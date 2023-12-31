import styles from "./VillageEditor.module.css";
import { BaseLayout, Position } from "../../engine/types";
import {
  Buildings,
  Grid,
  PlacementOutline,
} from "../../ui-components/composition/Village";
import { Button } from "../../ui-components/atoms/Button";
import {
  ArmyTray,
  Group,
  UnitButton,
} from "../../ui-components/composition/ArmyTray";
import {
  canUpgrade,
  getTownhallLevel,
  isOverlapping,
  maximizeBase,
  moveBuilding,
  placeNewBuilding,
  removeBuilding,
  upgradeBuilding,
} from "../../engine/layout/baseLayout";
import { useState } from "react";
import {
  calculateGridPosition,
  getTouchPosition,
} from "../../ui-components/composition/Village/Grid";
import { shiftPosition } from "../../engine/utils/shiftPosition";
import { createNextKey } from "../../engine/utils/keyStore";
import { Text } from "../../ui-components/atoms/Text";
import { EditTray } from "./EditTray";
import { GridFloat } from "../../ui-components/composition/Village/GridFloat";
import { ActivationRange } from "../../ui-components/composition/Village/ActivationRange";
import { WallPlacement } from "./WallPlacement";
import { findBuilding } from "../../engine/layout/findBuilding";
import { getBuildingTypesAndAvailableAmount } from "../../engine/layout/typesAndAvailable";
import { buildingStore } from "../../data/buildingStore";
import { VillageSelection } from "./types";
import { BuildingActions } from "./BuildingActions";

const getIsOutOfBounds = (
  buildings: { id: string }[],
  base: BaseLayout
): boolean =>
  buildings.some((buildingInfo) => {
    const building = base.items[buildingInfo.id];
    const position = building.position;
    return (
      !position ||
      position[0] < 3 ||
      position[1] < 3 ||
      position[0] + building.info.size[0] > base.gridSize[0] - 3 ||
      position[1] + building.info.size[1] > base.gridSize[1] - 3
    );
  });

export const VillageEditor: React.FC<{
  base: BaseLayout;
  onClose?: () => void;
  onSave?: (updatedBase: BaseLayout) => void;
  readOnly?: boolean;
  name?: string;
}> = ({ base: startBase, onClose, onSave, readOnly = false, name }) => {
  const [selection, setSelection] = useState<VillageSelection>(null);
  const [interactionMode, setInteractionMode] = useState<"selection" | "drag">(
    "selection"
  );
  const [dragState, setDragState] = useState<null | {
    dragStart?: [x: number, y: number];
    current?: [x: number, y: number];
  }>(null);

  const [base, updateBase] = useState(startBase);
  const [scoutView, updateScoutView] = useState(false);
  const typesAndAvailable = getBuildingTypesAndAvailableAmount(base);

  const labelItem =
    selection !== null &&
    "buildings" in selection &&
    base.items[selection.buildings[0].id];

  const clearSelection = () => {
    setSelection(null);
    setDragState(null);
    setInteractionMode("selection");
  };

  const onDragRelease = () => {
    if (selection && "buildings" in selection) {
      const outOfBounds = getIsOutOfBounds(selection.buildings, base);

      if (outOfBounds) {
        updateBase((base) =>
          selection.buildings.reduce(
            (base, buildingInfo) =>
              buildingInfo.isNew
                ? removeBuilding(base, buildingInfo.id)
                : moveBuilding(base, buildingInfo.id, buildingInfo.position),
            base
          )
        );
        clearSelection();
        return;
      }
      // When new & placed on valid position, update selection status
      if (
        selection.buildings.some((b) => b.isNew && !isOverlapping(base, b.id))
      ) {
        setSelection({
          buildings: selection.buildings.map((b) => {
            const building = base.items[b.id];
            if (b.isNew && !isOverlapping(base, b.id)) {
              return { ...b, isNew: false, position: building.position };
            }
            return b;
          }),
        });
      }
      setDragState(null);
      setInteractionMode("selection");
    }
  };

  const onDrag = (position: Position | undefined) => {
    if (!selection) return;

    if ("buildingType" in selection) {
      // Start dragging from tray, check if 'cursor' is now over the grid
      if (position) {
        const newId = createNextKey(
          Object.keys(base.items),
          selection.buildingType
        );
        updateBase((base) =>
          placeNewBuilding(
            base,
            selection.buildingType,
            selection.level,
            position,
            newId
          )
        );
        setSelection({
          buildings: [{ id: newId, position, isNew: true }],
        });
        setDragState({ dragStart: position });
      }
    }
    if ("buildings" in selection) {
      if (position && dragState && dragState.dragStart) {
        if (
          !dragState.current ||
          dragState.current[0] !== position[0] ||
          dragState.current[1] !== position[1]
        ) {
          const deltaX =
            position[0] -
            (dragState.current ? dragState.current[0] : dragState.dragStart[0]);
          const deltaY =
            position[1] -
            (dragState.current ? dragState.current[1] : dragState.dragStart[1]);
          updateBase((base) => {
            let updatingBase = base;
            for (const building of selection.buildings) {
              const b = updatingBase.items[building.id];
              updatingBase = moveBuilding(updatingBase, building.id, [
                b.position[0] + deltaX,
                b.position[1] + deltaY,
              ]);
            }
            return updatingBase;
          });
          setDragState((state) => ({ ...state, current: position }));
        }
      }
    }
  };

  const onSelect = (position: Position) => {
    // First check if earlier drag is continued
    const building = findBuilding(base, position);

    if (selection && "buildings" in selection) {
      // Check if select target is in selection

      const continueSelection = selection.buildings.some((b) => {
        const element = base.items[b.id];
        const xOff = position[0] - element.position[0];
        const yOff = position[1] - element.position[1];
        return (
          xOff >= 0 &&
          xOff < element.info.size[0] &&
          yOff >= 0 &&
          yOff < element.info.size[1]
        );
      });
      if (continueSelection) {
        setDragState({ dragStart: position });
        setInteractionMode("drag");
        return;
      }

      if (building) {
        const hasOverlaps = selection.buildings.some((e) =>
          isOverlapping(base, e.id)
        );
        if (hasOverlaps) {
          updateBase((base) =>
            selection.buildings.reduce(
              (base, buildingInfo) =>
                buildingInfo.isNew
                  ? removeBuilding(base, buildingInfo.id)
                  : moveBuilding(base, buildingInfo.id, buildingInfo.position),
              base
            )
          );
        }
      }
    }

    if (building) {
      setSelection({
        buildings: [{ id: building.buildingId, position: building.position }],
      });
      setDragState({ dragStart: position });
    } else {
      if (
        labelItem &&
        labelItem.info.type === "wall" &&
        typesAndAvailable["wall"] > 0
      ) {
        const wallPos = labelItem.position;

        const isDirectNeighbor =
          (wallPos[0] === position[0] &&
            Math.abs(wallPos[1] - position[1]) === 1) ||
          (wallPos[1] === position[1] &&
            Math.abs(wallPos[0] - position[0]) === 1);
        const isDirectNeighbor2 =
          (wallPos[0] === position[0] &&
            Math.abs(wallPos[1] - position[1]) === 2) ||
          (wallPos[1] === position[1] &&
            Math.abs(wallPos[0] - position[0]) === 2);
        const inBetween: Position = [
          (position[0] + wallPos[0]) / 2,
          (position[1] + wallPos[1]) / 2,
        ];

        if (
          isDirectNeighbor ||
          (isDirectNeighbor2 && !findBuilding(base, inBetween))
        ) {
          const newId = createNextKey(Object.keys(base.items), "wall");

          const newId2 = createNextKey(
            Object.keys(base.items).concat(newId),
            "wall"
          );

          updateBase((base) => {
            let result = placeNewBuilding(
              base,
              "wall",
              labelItem.info.level,
              position,
              newId
            );

            if (isDirectNeighbor2) {
              result = placeNewBuilding(
                result,
                "wall",
                labelItem.info.level,
                inBetween,
                newId2
              );
            }

            return result;
          });
          setSelection({
            buildings: [{ id: newId, position }],
          });
          setDragState({ dragStart: position });
        }
      }
    }
  };

  return (
    <div className={styles.editor}>
      <main>
        <Grid
          width={base.gridSize[0]}
          height={base.gridSize[1]}
          scrollable={interactionMode !== "drag"}
          onMouseDown={(e) => {
            if (dragState !== null && selection !== null) {
              onDragRelease();
            }

            const position = calculateGridPosition(
              e.currentTarget,
              e.clientX,
              e.clientY,
              true
            );
            if (!position) return;
            onSelect(position);
          }}
          onMouseMove={(e) => {
            if (e.stopPropagation) e.stopPropagation();
            if (e.preventDefault) e.preventDefault();

            if (dragState === null || selection === null || readOnly) {
              return;
            }
            if (e.buttons === 0) {
              onDragRelease();
              return;
            }
            onDrag(
              calculateGridPosition(e.currentTarget, e.clientX, e.clientY, true)
            );
          }}
          onMouseUp={(e) => {
            if (e.stopPropagation) e.stopPropagation();
            if (e.preventDefault) e.preventDefault();

            if (dragState === null || selection === null || readOnly) {
              return;
            }
            onDragRelease();
          }}
          onTouchStart={(e) => {
            if (dragState !== null && selection !== null) {
              onDragRelease();
            }
            const position = getTouchPosition(e, true);

            if (!position) {
              return;
            }
            onSelect(position);
          }}
          onTouchMove={(e) => {
            if (
              dragState === null ||
              selection === null ||
              readOnly ||
              interactionMode === "selection"
            ) {
              return;
            }

            onDrag(shiftPosition(getTouchPosition(e, true), -1, -1));
          }}
          onTouchEnd={(e) => {
            if (
              dragState === null ||
              selection === null ||
              readOnly ||
              interactionMode === "selection"
            ) {
              return;
            }
            onDragRelease();
          }}
        >
          <PlacementOutline mode={scoutView ? "dark" : "light"} layout={base} />
          <Buildings
            showHidden={!scoutView}
            layout={base}
            selection={
              selection !== null && "buildings" in selection
                ? selection.buildings.map((b) => b.id)
                : []
            }
          />
          {labelItem &&
            labelItem.info.type === "wall" &&
            typesAndAvailable["wall"] > 0 && (
              <WallPlacement currentWall={labelItem} layout={base} />
            )}
          {labelItem && labelItem.info.triggerRadius && (
            <ActivationRange
              x={labelItem.position[0] + labelItem.info.size[0] / 2}
              y={labelItem.position[1] + labelItem.info.size[1] / 2}
              maxRange={labelItem.info.triggerRadius}
              minRange={labelItem.info.triggerDeadZone}
            />
          )}
          {labelItem && (
            <GridFloat x={labelItem.position[0]} y={labelItem.position[1]}>
              <Text centered element="h1" color="palegreen">
                {labelItem.info.displayName ?? labelItem.info.type}
              </Text>
              <Text centered size="small" color="springgreen">
                level {labelItem.info.level}
              </Text>
            </GridFloat>
          )}
        </Grid>

        <EditTray
          scoutView={scoutView}
          readOnly={readOnly || getTownhallLevel(base) === 0}
          onScoutViewChange={(newView) => updateScoutView(newView)}
          onClose={onClose}
          onMaximize={() => updateBase(maximizeBase)}
          onSave={() => {
            onSave?.(base);
          }}
        />
        {name && (
          <div className={styles.name}>
            <Text>{name}</Text>
          </div>
        )}

        {dragState === null &&
          selection !== null &&
          "buildings" in selection && (
            <div className={styles.toolBar}>
              {selection.buildings.length === 1 && !readOnly && (
                <>
                  <Button
                    color="#F2E1D9"
                    width="default"
                    height="default"
                    disabled={!canUpgrade(base, selection.buildings[0].id)}
                    onClick={() => {
                      updateBase((base) =>
                        upgradeBuilding(base, selection.buildings[0].id)
                      );
                    }}
                  >
                    ⬆
                  </Button>
                  <Button
                    color="red"
                    width="default"
                    height="default"
                    onClick={() => {
                      updateBase((base) =>
                        removeBuilding(base, selection.buildings[0].id)
                      );
                      setSelection(null);
                    }}
                  >
                    🗑️
                  </Button>
                  <BuildingActions
                    selection={selection}
                    base={base}
                    updateBase={updateBase}
                  />
                </>
              )}
            </div>
          )}
      </main>
      {!readOnly && (
        <ArmyTray className={styles.placementControl} darkOverlay>
          <Group>
            {Object.entries(typesAndAvailable).map(([type, amount]) => {
              const building = buildingStore.getBuilding(type, 1);
              return (
                <UnitButton
                  key={type}
                  buttonColor="#bbf"
                  portraitColor="#bbf"
                  label={building?.displayName ?? type}
                  jump
                  amount={amount}
                  hidden={amount === 0}
                  selected={
                    selection !== null &&
                    "buildingType" in selection &&
                    selection.buildingType === type
                  }
                  onTouchStart={() => {
                    setSelection({ buildingType: type, level: 1 });
                    setDragState({});
                  }}
                  onTouchMove={(e) => {
                    if (dragState === null || selection === null) {
                      return;
                    }
                    onDrag(shiftPosition(getTouchPosition(e, true), -2, -2));
                  }}
                  onTouchEnd={(e) => {
                    if (e.stopPropagation) e.stopPropagation();
                    if (e.preventDefault) e.preventDefault();

                    if (dragState === null || selection === null) {
                      return;
                    }
                    onDragRelease();
                  }}
                  onMouseDown={() => {
                    setSelection({ buildingType: type, level: 1 });
                    setDragState({});
                  }}
                />
              );
            })}
          </Group>
        </ArmyTray>
      )}
    </div>
  );
};
