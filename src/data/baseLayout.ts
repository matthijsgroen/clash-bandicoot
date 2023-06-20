export type LayoutBuilding = {
  position: [x: number, y: number];
  buildingType: string;
  buildingLevel: number;
  buildingState?: string;
  buildingDirection?: number;
};

export type BaseLayout = {
  gridSize: [width: number, height: number];
  items: LayoutBuilding[];
};

export const newLayout = (width = 17, height = 17): BaseLayout => ({
  gridSize: [width, height],
  items: [],
});

export const placeBuilding = (
  layout: BaseLayout,
  building: LayoutBuilding
): BaseLayout => ({
  ...layout,
  items: layout.items.concat(building),
});
