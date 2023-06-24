import {
  createArmy,
  addTroop,
  getArmySize,
  buildArmy,
  getPlacementOverview,
} from "./armyComposition";
import { troopStore } from "./troopStore";

describe("Army composition", () => {
  describe("createArmy", () => {
    it("creates an empty army", () => {
      const army = createArmy();
      expect(army).toEqual({ units: [] });
    });
  });

  describe("addTroop", () => {
    it("adds a troop of a specific level to an army", () => {
      const army = createArmy();
      const armyWithTroop = addTroop(army, "barbarian", 1);

      const barb = troopStore.getTroop("barbarian", 1);
      expect(armyWithTroop).toEqual({
        units: [{ troop: barb, state: "ready" }],
      });
    });
  });

  describe("getArmySize", () => {
    it("returns 0 for an empty army", () => {
      const army = createArmy();
      const result = getArmySize(army);
      expect(result).toEqual(0);
    });

    it("returns the size of an army", () => {
      const army = buildArmy()
        .addTroops("barbarian", 1, 5)
        .addTroops("archer", 1, 10)
        .result();

      expect(getArmySize(army)).toEqual(15);
    });
  });

  describe("getPlacementOverview", () => {
    it("returns the size of each unit group that is not placed", () => {
      const army = buildArmy()
        .addTroops("barbarian", 1, 5)
        .addTroops("archer", 1, 8)
        .addTroops("barbarian", 1, 5)
        .addTroops("archer", 2, 2)
        .result();

      expect(getPlacementOverview(army)).toEqual([
        { type: "barbarian", level: 1, available: 10 },
        { type: "archer", level: 1, available: 8 },
        { type: "archer", level: 2, available: 2 },
      ]);
    });
  });
});
