import { armyBuilder } from "./armyComposition";
import { compressArmy, decompressArmy, pack } from "./packArmy";

describe("compressArmy", () => {
  it("packs units grouped per level", () => {
    const army = armyBuilder()
      .addTroops("barbarian", 2, 5)
      .addTroops("barbarian", 3, 1)
      .result();

    const result = compressArmy(army);
    expect([...result]).toEqual([2, 0, 3, 1, 0, 2, 5, 0, 0, 0, 0]);
  });

  it("packs different units in same category", () => {
    const army = armyBuilder()
      .addTroops("archer", 2, 5)
      .addTroops("barbarian", 3, 1)
      .result();

    const result = compressArmy(army);
    expect([...result]).toEqual([2, 0, 3, 1, 1, 2, 5, 0, 0, 0, 0]);
  });
});

describe("decompressArmy", () => {
  it("unpacks packs units grouped per level", () => {
    const buffer = Uint8Array.from([2, 0, 3, 1, 0, 2, 5, 0, 0, 0, 0]);

    const result = decompressArmy(buffer);
    expect(result.units).toHaveLength(6);
    const firstUnitType = result.units[0].troop;
    expect(firstUnitType.type).toEqual("barbarian");
    expect(firstUnitType.level).toEqual(3);
  });
});

describe("pack", () => {
  it("creates a minified string from an army", () => {
    const army = armyBuilder()
      .addTroops("goblin", 1, 4)
      .addTroops("barbarian", 1, 1)
      .addTroops("giant", 1, 5)
      .result();

    const result = pack(army);
    expect(result).toEqual("AwABAQIBBQMBBAAAAAA");
  });
});
