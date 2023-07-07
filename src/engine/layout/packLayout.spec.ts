import {
  compressLayout,
  decompressLayout,
  packLayout,
  unpackLayout,
} from "./packLayout";
import { layoutBuilder } from "./baseLayout";

describe("compressLayout", () => {
  describe("empty space", () => {
    it("returns an empty grid", () => {
      const layout = layoutBuilder(26, 26).result();

      const result = compressLayout(layout);
      expect([...result]).toEqual([4]);

      const packed = packLayout(result);
      expect(packed).toEqual("BA");
    });
  });

  describe("single building", () => {
    it("places all items in a list", () => {
      const layout = layoutBuilder(26, 26)
        .placeBuilding("townhall", 7, [11, 6])
        .result();

      const result = compressLayout(layout);
      expect([...result]).toEqual([4, 0, 68, 1, 7]);
    });
  });

  describe("complex base building", () => {
    it("places all items in a list", () => {
      const layout = layoutBuilder()
        .placeBuilding("townhall", 1, [18, 20])
        .placeBuilding("archertower", 1, [15, 20])
        .placeBuilding("cannon", 1, [18, 24])
        .placeBuilding("archertower", 1, [22, 25])
        .placeBuilding("elixirstorage", 4, [19, 14])
        .placeBuilding("builderhut", 1, [21, 11])
        .placeBuilding("barracks", 1, [23, 11])
        .placeBuilding("armycamp", 1, [26, 16])
        .placeBuilding("goldstorage", 4, [14, 24])
        .moveAll(3, 3)
        .result();

      const bytes = compressLayout(layout);
      const result = packLayout(bytes);
      expect(result).toEqual("CP8AzgMBCAEAaQcEAE4JAQCFDQEBAQCGBgQAAQoBACMNAQ");
    });

    it("compresses walls (horizontal)", () => {
      const layout = layoutBuilder()
        .placeBuilding("wall", 3, [3, 2])
        .placeBuilding("wall", 3, [4, 2])
        .placeBuilding("wall", 3, [5, 2])
        .placeBuilding("wall", 3, [6, 2])
        .placeBuilding("wall", 3, [7, 2])
        .placeBuilding("wall", 3, [8, 2])
        .placeBuilding("wall", 3, [9, 2])
        .moveAll(3, 3)
        .result();

      const bytes = compressLayout(layout);
      expect([...bytes]).toEqual([8, 0, 83, 15, 3, 7]);
    });

    it("compresses walls (vertical)", () => {
      const layout = layoutBuilder()
        .placeBuilding("wall", 3, [2, 3])
        .placeBuilding("wall", 3, [2, 4])
        .placeBuilding("wall", 3, [2, 5])
        .placeBuilding("wall", 3, [2, 6])
        .placeBuilding("wall", 3, [2, 7])
        .placeBuilding("wall", 3, [2, 8])
        .placeBuilding("wall", 3, [2, 9])
        .moveAll(3, 3)
        .result();

      const bytes = compressLayout(layout);
      expect([...bytes]).toEqual([8, 0, 122, 16, 3, 7]);
    });
  });
});

describe("uncompressLayout", () => {
  it("can extract empty grid from base64 string", () => {
    const unpacked = unpackLayout("BP8AkQ");
    expect([...unpacked]).toEqual([4, 255, 0, 145]);

    const layout = decompressLayout(unpacked);
    expect(layout.gridSize).toEqual([26, 26]);
    expect(Object.keys(layout.items)).toHaveLength(0);
  });

  it("can extract layout from base64 string", () => {
    const unpacked = unpackLayout(
      "CP8AzgMBCAEAaQcEAE4JAQCFDQEBAQCGBgQAAQoBACMNAQ"
    );
    const layout = decompressLayout(unpacked);
    expect(layout.gridSize).toEqual([46, 46]);
    expect(Object.keys(layout.items)).toHaveLength(9);

    const referenceLayout = layoutBuilder()
      .placeBuilding("townhall", 1, [18, 20])
      .placeBuilding("archertower", 1, [15, 20])
      .placeBuilding("cannon", 1, [18, 24])
      .placeBuilding("archertower", 1, [22, 25])
      .placeBuilding("elixirstorage", 4, [19, 14])
      .placeBuilding("builderhut", 1, [21, 11])
      .placeBuilding("barracks", 1, [23, 11])
      .placeBuilding("armycamp", 1, [26, 16])
      .placeBuilding("goldstorage", 4, [14, 24])
      .moveAll(3, 3)
      .result();

    expect(referenceLayout).toEqual(layout);
  });
});
