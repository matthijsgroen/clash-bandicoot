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
import { layoutBuilder } from "../engine/layout/baseLayout";
import { useRef, useState } from "react";
import { calculateGridPosition } from "../ui-components/composition/Village/Grid";

const getTouchPosition = (
  e: React.TouchEvent<HTMLElement>
): [x: number, y: number] | undefined => {
  const mainTouch = e.touches[0];
  let position: [x: number, y: number] | undefined = undefined;
  if (!mainTouch) {
    return undefined;
  }
  const element = document.elementFromPoint(
    mainTouch.clientX,
    mainTouch.clientY
  ) as HTMLElement | null;

  if (!element) {
    return;
  }

  return calculateGridPosition(
    element,
    mainTouch.clientX,
    mainTouch.clientY,
    true
  );
};

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

  const builder = useRef(layoutBuilder().updateWithLayout(startBase));
  // builder.placeBuilding("townhall", 1, [20, 20]);
  const base = builder.current.result();

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
    if (
      selection &&
      "buildings" in selection &&
      selection.buildings.length === 1 &&
      selection.buildings[0].id === "newBuilding"
    ) {
      const building = base.items["newBuilding"];
      const position = building.position;
      // dropping a new building
      const outOfBounds =
        !position ||
        position[0] < 3 ||
        position[1] < 3 ||
        position[0] + building.info.size[0] > base.gridSize[0] - 3 ||
        position[1] + building.info.size[1] > base.gridSize[1] - 3;

      if (outOfBounds) {
        builder.current.removeBuilding("newBuilding");
      } else {
        builder.current
          .removeBuilding("newBuilding")
          .placeBuilding(
            building.info.type,
            building.info.level,
            building.position
          );
      }
      clearSelection();
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
        builder.current.placeBuilding(
          selection.buildingType,
          selection.level,
          position,
          "newBuilding"
        );
        setSelection({
          buildings: [{ id: "newBuilding", position, isNew: true }],
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
          const deltaX = position[0] - dragState.dragStart[0];
          const deltaY = position[1] - dragState.dragStart[1];
          for (const building of selection.buildings) {
            builder.current.moveBuilding(building.id, [
              building.position[0] + deltaX,
              building.position[1] + deltaY,
            ]);
          }
          setDragState((state) => ({ ...state, current: position }));
        }
      }
    }
  };

  const onSelect = (position: [x: number, y: number]) => {
    const building = Object.values(builder.current.result().items).find(
      (element) => {
        const xOff = position[0] - element.position[0];
        const yOff = position[1] - element.position[1];
        return (
          xOff >= 0 &&
          xOff <= element.info.size[0] &&
          yOff >= 0 &&
          yOff <= element.info.size[1]
        );
      }
    );
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
            const position = getTouchPosition(e);

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

            onDrag(getTouchPosition(e));
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
          <Button onClick={onClose} color="red">
            Go back
          </Button>
        </div>
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
                onDrag(getTouchPosition(e));
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
