import "../../data/buildings";
import { buildingStore } from "../../data/buildingStore";
import { createKeyStore, createNextKey } from "../utils/keyStore";
import { BaseLayout, LayoutBuilding } from "../types";
import { Building } from "../../data/types";

const DEFAULT_WIDTH = 46;
const DEFAULT_HEIGHT = 46;

export const newLayout = (
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT
): BaseLayout => ({
  gridSize: [width, height],
  items: {},
});

export const isVisible = <Settings extends Record<string, unknown>>(
  building: Building<Settings>
): boolean => !building.categories.some((c) => c === "trap");

export const placeBuilding = (
  layout: BaseLayout,
  building: LayoutBuilding
): BaseLayout => {
  return {
    ...layout,
    items: {
      ...layout.items,
      [building.buildingId]: building,
    },
  };
};

export const placeNewBuilding = (
  layout: BaseLayout,
  type: string,
  level: number,
  position: [x: number, y: number],
  buildingId?: string
): BaseLayout => {
  const building = buildingStore.getBuilding(type, level);
  if (!building) {
    return layout;
  }
  const id = buildingId ?? createNextKey(Object.keys(layout.items), type);
  return placeBuilding(layout, {
    info: building,
    position,
    buildingId: id,
  });
};

export const getTownhallLevel = (layout: BaseLayout): number => {
  const townhall = Object.values(layout.items).find(
    (b) => b.info.type === "townhall"
  );
  return townhall ? townhall.info.level : 0;
};

export const canUpgrade = (layout: BaseLayout, buildingId: string): boolean => {
  const currentBuilding = layout.items[buildingId];
  if (!currentBuilding) return false;

  const upgradedVersion = buildingStore.getBuilding(
    currentBuilding.info.type,
    currentBuilding.info.level + 1
  );
  if (!upgradedVersion) {
    return false;
  }
  if (currentBuilding.info.type === "townhall") {
    return true;
  }
  const townhallLevel = getTownhallLevel(layout);

  return upgradedVersion.thRequirement <= townhallLevel;
};

export const moveBuilding = (
  layout: BaseLayout,
  buildingId: string,
  newPosition: [x: number, y: number]
): BaseLayout => ({
  ...layout,
  items: {
    ...layout.items,
    [buildingId]: {
      ...layout.items[buildingId],
      position: newPosition,
    },
  },
});

export const isOverlapping = (
  layout: BaseLayout,
  buildingId: string
): boolean => {
  const building = layout.items[buildingId];
  const [x, y] = building.position;
  const [w, h] = building.info.size;

  return Object.values(layout.items).some(
    (element) =>
      element.buildingId !== buildingId &&
      element.position[0] < x + w &&
      element.position[0] + element.info.size[0] > x &&
      element.position[1] < y + h &&
      element.position[1] + element.info.size[1] > y
  );
};

export const upgradeBuilding = (
  layout: BaseLayout,
  buildingId: string,
  levelIncrease = 1
): BaseLayout => {
  const currentBuilding = layout.items[buildingId];
  const upgradedVersion = buildingStore.getBuilding(
    currentBuilding.info.type,
    currentBuilding.info.level + levelIncrease
  );
  if (!upgradedVersion) {
    return layout;
  }

  return {
    ...layout,
    items: {
      ...layout.items,
      [buildingId]: {
        ...layout.items[buildingId],
        info: upgradedVersion,
      },
    },
  };
};

export const removeBuilding = (layout: BaseLayout, buildingId: string) => {
  const result = {
    ...layout,
    items: {
      ...layout.items,
    },
  };
  delete result.items[buildingId];
  return result;
};

export const layoutBuilder = (
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT
) => {
  let layout = newLayout(width, height);
  let keyStore = createKeyStore();

  const builder = {
    updateWithLayout: (baseLayout: BaseLayout) => {
      layout = baseLayout;
      keyStore = createKeyStore(Object.keys(layout.items));
      return builder;
    },
    placeBuilding: (
      type: string,
      level: number,
      position: [x: number, y: number],
      buildingId?: string
    ) => {
      const building = buildingStore.getBuilding(type, level);
      if (!building) {
        return builder;
      }
      const id = buildingId ?? keyStore.getKey(type);
      layout = placeBuilding(layout, {
        info: building,
        position,
        buildingId: id,
      });
      return builder;
    },
    moveBuilding: (buildingId: string, newPosition: [x: number, y: number]) => {
      layout = moveBuilding(layout, buildingId, newPosition);
      return builder;
    },
    removeBuilding: (buildingId: string) => {
      layout = removeBuilding(layout, buildingId);
      return builder;
    },
    moveAll: (deltaX: number, deltaY: number) => {
      Object.values(layout.items).forEach((building) => {
        building.position[0] += deltaX;
        building.position[1] += deltaY;
      });

      return builder;
    },
    result: () => layout,
  };
  return builder;
};
