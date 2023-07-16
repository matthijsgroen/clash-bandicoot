import styles from "./VillageEditor.module.css";
import { BaseLayout } from "../engine/types";
import {
  Buildings,
  Grid,
  PlacementOutline,
} from "../ui-components/composition/Village";
import { Button } from "../ui-components/atoms/Button";
import {
  ArmyTray,
  Group,
  UnitButton,
} from "../ui-components/composition/ArmyTray";
import { buildingList } from "../engine/layout/compressList";
import { buildingStore } from "../data/buildingStore";
import {
  canUpgrade,
  isOverlapping,
  moveBuilding,
  placeNewBuilding,
  removeBuilding,
  upgradeBuilding,
} from "../engine/layout/baseLayout";
import { useState } from "react";
import {
  calculateGridPosition,
  getTouchPosition,
} from "../ui-components/composition/Village/Grid";
import { shiftPosition } from "../data/utils/shiftPosition";
import { createNextKey } from "../engine/utils/keyStore";

export const VillageEditor: React.FC<{
  base: BaseLayout;
  onClose?: () => void;
}> = ({ base: startBase, onClose }) => {
  const [selection, setSelection] = useState<
    | null
    | {
        buildings: {
          id: string;
          position: [x: number, y: number];
          isNew?: boolean;
        }[];
      }
    | { buildingType: string; level: number }
  >(null);
  const [dragState, setDragState] = useState<null | {
    dragStart?: [x: number, y: number];
    current?: [x: number, y: number];
  }>(null);

  const [base, updateBase] = useState(startBase);

  const townHallLevel = Object.values(base.items).reduce(
    (r, e) => (e.info.type === "townhall" ? e.info.level : r),
    1
  );

  const typesAndAvailable: Record<string, number> = buildingList.reduce(
    (r, buildingType) => {
      const amountUsed = Object.values(base.items).reduce(
        (r, e) => (e.info.type === buildingType ? r + 1 : r),
        0
      );
      const amountAvailable = buildingStore.getMaxBuildingAmount(
        townHallLevel,
        buildingType
      );

      if (amountAvailable > 0) {
        return {
          ...r,
          [buildingType]: amountAvailable - amountUsed,
        };
      }
      return r;
    },
    {} as Record<string, number>
  );

  const onDragRelease = () => {
    if (selection && "buildings" in selection) {
      const outOfBounds = selection.buildings.some((buildingInfo) => {
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

      if (outOfBounds) {
        selection.buildings.forEach((buildingInfo) => {
          if (buildingInfo.isNew) {
            updateBase((base) => removeBuilding(base, buildingInfo.id));
          } else {
            updateBase((base) =>
              moveBuilding(base, buildingInfo.id, buildingInfo.position)
            );
          }
        });
        setSelection(null);
      }
      setSelection((s) => {
        if (s && "buildings" in s) {
          return {
            buildings: s.buildings.map((b) => {
              const building = base.items[b.id];
              if (b.isNew && !isOverlapping(base, b.id)) {
                return { ...b, isNew: false, position: building.position };
              }
              return b;
            }),
          };
        }
        return s;
      });
      setDragState(null);
    }
  };

  const clearSelection = () => {
    setSelection(null);
    setDragState(null);
  };

  const onDrag = (position: [x: number, y: number] | undefined) => {
    if (!selection) return;

    if ("buildingType" in selection) {
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

  const onSelect = (position: [x: number, y: number]) => {
    // First check if earlier drag is continued
    const building = Object.values(base.items).find((element) => {
      const xOff = position[0] - element.position[0];
      const yOff = position[1] - element.position[1];
      return (
        xOff >= 0 &&
        xOff <= element.info.size[0] &&
        yOff >= 0 &&
        yOff <= element.info.size[1]
      );
    });

    if (selection && "buildings" in selection) {
      // Check if select target is in selection

      const continueSelection = selection.buildings.some((b) => {
        const element = base.items[b.id];
        const xOff = position[0] - element.position[0];
        const yOff = position[1] - element.position[1];
        return (
          xOff >= 0 &&
          xOff <= element.info.size[0] &&
          yOff >= 0 &&
          yOff <= element.info.size[1]
        );
      });
      if (continueSelection) {
        setDragState({ dragStart: position });
        return;
      }

      const hasOverlaps = selection.buildings.some((e) =>
        isOverlapping(base, e.id)
      );
      if (hasOverlaps) {
        updateBase((base) => {
          let updatedBase = base;
          for (const building of selection.buildings) {
            if (building.isNew) {
              updatedBase = removeBuilding(updatedBase, building.id);
            } else {
              updatedBase = moveBuilding(
                updatedBase,
                building.id,
                building.position
              );
            }
          }
          return updatedBase;
        });
      }
    }

    if (building) {
      setSelection({
        buildings: [{ id: building.buildingId, position: building.position }],
      });
      setDragState({ dragStart: position });
    } else {
      clearSelection();
    }
  };

  return (
    <div className={styles.editor}>
      <main>
        <Grid
          width={base.gridSize[0]}
          height={base.gridSize[1]}
          scrollable={dragState === null}
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

            if (dragState === null || selection === null) {
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

            if (dragState === null || selection === null) {
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
              clearSelection();
              return;
            }
            onSelect(position);
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
        >
          <PlacementOutline mode="light" layout={base} />
          <Buildings
            showHidden
            layout={base}
            selection={
              selection !== null && "buildings" in selection
                ? selection.buildings.map((b) => b.id)
                : []
            }
          />
        </Grid>
        <div className={styles.goBack}>
          <Button onClick={onClose} color="red" width="large" height="small">
            Go back
          </Button>
        </div>
        {dragState === null &&
          selection !== null &&
          "buildings" in selection && (
            <div className={styles.toolBar}>
              {selection.buildings.length === 1 && (
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
              )}
              {selection.buildings.length === 1 && (
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
              )}
            </div>
          )}
      </main>
      <ArmyTray className={styles.placementControl}>
        <Group>
          {Object.entries(typesAndAvailable).map(([type, amount]) => (
            <UnitButton
              key={type}
              buttonColor="#bbf"
              portraitColor="#bbf"
              label={type}
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
          ))}
        </Group>
      </ArmyTray>
    </div>
  );
};
