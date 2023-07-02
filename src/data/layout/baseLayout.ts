import "../buildings";
import { buildingStore } from "../buildingStore";
import { createKeyStore } from "../utils/keyStore";
import { BaseLayout, LayoutBuilding } from "../types";

const DEFAULT_WIDTH = 40;
const DEFAULT_HEIGHT = 40;

export const newLayout = (
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT
): BaseLayout => ({
  gridSize: [width, height],
  items: {},
});

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
  const keyStore = createKeyStore();

  const builder = {
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
    result: () => layout,
  };
  return builder;
};