import { buildingStore } from "../../data/buildingStore";
import { LayoutBuilding } from "../types";
import {
  getTownhallLevel,
  newLayout,
  placeBuilding,
  placeNewBuilding,
} from "./baseLayout";

describe("newLayout", () => {
  it("uses 46 by 46 as default size", () => {
    const result = newLayout();
    expect(result.gridSize).toEqual([46, 46]);
  });

  it("allows custom sizes", () => {
    const result = newLayout(20, 15);
    expect(result.gridSize).toEqual([20, 15]);
  });

  it("has nothing placed", () => {
    const result = newLayout(20, 15);
    expect(Object.values(result.items)).toHaveLength(0);
  });
});

describe("placeBuilding", () => {
  it("adds a LayoutBuilding to the layout", () => {
    const building = buildingStore.getBuilding("townhall", 1);
    expect(building).toBeDefined();
    if (!building) return;

    const start = newLayout();
    const layoutBuilding: LayoutBuilding = {
      position: [10, 10],
      buildingId: "foo",
      info: building,
    };
    const placed = placeBuilding(start, layoutBuilding);

    expect(placed).toHaveProperty("items.foo", layoutBuilding);
  });
});

describe("placeNewBuilding", () => {
  it("creates a LayoutBuilding for you and places is", () => {
    const start = newLayout();
    const placed = placeNewBuilding(start, "townhall", 1, [10, 10]);

    expect(placed.items["townhall#1"]).toBeDefined();
    expect(placed.items["townhall#1"].position).toEqual([10, 10]);
    expect(placed.items["townhall#1"].info.type).toEqual("townhall");
    expect(placed.items["townhall#1"].info.level).toEqual(1);
  });
});

describe("getTownhallLevel", () => {
  it("returns the townhall level in a layout", () => {
    const layout = placeNewBuilding(newLayout(), "townhall", 3, [10, 10]);
    expect(getTownhallLevel(layout)).toEqual(3);
  });

  it("returns 0 if there is no townhall", () => {
    const layout = placeNewBuilding(newLayout(), "goldmine", 3, [10, 10]);
    expect(getTownhallLevel(layout)).toEqual(0);
  });
});
