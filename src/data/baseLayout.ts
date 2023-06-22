import { createKeyStore } from "./keyStore";

export type LayoutBuilding = {
  position: [x: number, y: number];
  buildingId: string;
  buildingType: string;
  buildingLevel: number;
  buildingState?: string;
  buildingDirection?: number;
};

export type BaseLayout = {
  gridSize: [width: number, height: number];
  items: Record<string, LayoutBuilding>;
};

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
      const buildingId = keyStore.getKey(type);
      layout = placeBuilding(layout, {
        buildingType: type,
        buildingLevel: level,
        position,
        buildingId,
      });
      return builder;
    },
    result: () => layout,
  };
  return builder;
};
