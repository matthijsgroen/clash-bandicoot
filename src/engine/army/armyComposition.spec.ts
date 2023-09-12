import { troopStore } from "../../data/troopStore";
import {
  createArmy,
  addTroop,
  armyBuilder,
  getPlacementOverview,
  placeUnit,
  canDeployTroops,
} from "./armyComposition";
import { getArmySize } from "./armySize";

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
      const army = armyBuilder()
        .addTroops("barbarian", 1, 5)
        .addTroops("archer", 1, 10)
        .result();

      expect(getArmySize(army)).toEqual(15);
    });
  });

  describe("getPlacementOverview", () => {
    it("returns the size of each unit group that is not placed", () => {
      const army = armyBuilder()
        .addTroops("barbarian", 1, 5)
        .addTroops("giant", 2, 8)
        .addTroops("archer", 1, 8)
        .addTroops("barbarian", 1, 5)
        .addTroops("goblin", 1, 1)
        .addTroops("archer", 2, 2)
        .result();

      expect(getPlacementOverview(army)).toEqual([
        {
          type: "barbarian",
          level: 1,
          available: 10,
          category: "elixirTroops",
          categoryIndex: 0,
        },
        {
          type: "archer",
          level: 2,
          available: 2,
          category: "elixirTroops",
          categoryIndex: 1,
        },
        {
          type: "archer",
          level: 1,
          available: 8,
          category: "elixirTroops",
          categoryIndex: 1,
        },
        {
          type: "giant",
          level: 2,
          available: 8,
          category: "elixirTroops",
          categoryIndex: 2,
        },
        {
          type: "goblin",
          level: 1,
          available: 1,
          category: "elixirTroops",
          categoryIndex: 3,
        },
      ]);
    });
  });

  describe("placeUnit", () => {
    it("marks first available unit as placed", () => {
      const army = armyBuilder().addTroops("barbarian", 1, 3).result();

      const [updatedArmy] = placeUnit(army, "barbarian", 1);
      const placementState = updatedArmy.units.map((t) => t.state);
      expect(placementState).toEqual(["placed", "ready", "ready"]);

      const [updatedArmy2] = placeUnit(updatedArmy, "barbarian", 1);
      const placementState2 = updatedArmy2.units.map((t) => t.state);
      expect(placementState2).toEqual(["placed", "placed", "ready"]);
    });
  });

  describe("canDeployTroops", () => {
    it("returns false for empty army", () => {
      const army = armyBuilder().result();

      const result = canDeployTroops(army);
      expect(result).toBe(false);
    });

    it("returns false for army with placed troops", () => {
      const army = armyBuilder()
        .addTroops("barbarian", 1, 2)
        .placeTroop("barbarian", 1)
        .placeTroop("barbarian", 1)
        .result();

      const result = canDeployTroops(army);
      expect(result).toBe(false);
    });

    it("returns true for ready troops", () => {
      const army = armyBuilder()
        .addTroops("barbarian", 1, 2)
        .placeTroop("barbarian", 1)
        .result();

      const result = canDeployTroops(army);
      expect(result).toBe(true);
    });
  });
});
