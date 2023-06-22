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
  building: Omit<LayoutBuilding, "buildingId">
): BaseLayout => {
  const counter =
    Object.values(layout.items).filter(
      (e) => e.buildingType === building.buildingType
    ).length + 1;
  const buildingId = `${building.buildingType}#${counter}`;

  return {
    ...layout,
    items: {
      ...layout.items,
      [buildingId]: {
        ...building,
        buildingId,
      },
    },
  };
};

export const layoutBuilder = (
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT
) => {
  let layout = newLayout(width, height);

  const builder = {
    placeBuilding: (
      type: string,
      level: number,
      position: [x: number, y: number]
    ) => {
      layout = placeBuilding(layout, {
        buildingType: type,
        buildingLevel: level,
        position,
      });
      return builder;
    },
    result: () => layout,
  };
  return builder;
};
