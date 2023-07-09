import "../../data/buildings";
import { buildingStore } from "../../data/buildingStore";
import { createKeyStore } from "../utils/keyStore";
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
      position: [x: number, y: number]
    ) => {
      const building = buildingStore.getBuilding(type, level);
      if (!building) {
        return builder;
      }
      const buildingId = keyStore.getKey(type);
      layout = placeBuilding(layout, {
        info: building,
        position,
        buildingId,
      });
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
