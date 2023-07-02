import { layoutBuilder } from "../layout/baseLayout";
import { troopStore } from "../troopStore";
import { handleAttack } from "./attack";

describe("attack", () => {
  describe("while nothing happens", () => {
    it("reports health", () => {
      const village = layoutBuilder()
        .placeBuilding("townhall", 1, [35, 35])
        .result();

      const attack = handleAttack(village);
      attack.forwardTime(3 * 60 * 1000);

      const result = attack.getData();

      expect(result.baseData).toEqual({
        "townhall#1": {
          hitPoints: 450,
          effects: [],
          center: [37, 37],
          state: "idle",
          building: village.items["townhall#1"],
          buildingData: {},
        },
      });
      expect(result.timeSpent).toEqual(180_000);
    });
  });

  describe("placing a troop", () => {
    it("affects the replay, and places the unit", () => {
      const village = layoutBuilder()
        .placeBuilding("townhall", 1, [35, 35])
        .result();

      const attack = handleAttack(village);
      attack.forwardTime(1 * 60 * 1000);
      attack.placeUnit("barbarian", 1, [1, 1]);

      const result = attack.getData();

      expect(result.timeSpent).toEqual(60_000);
      expect(result.replay).toEqual({
        placement: [
          { level: 1, unit: "barbarian", timestamp: 60_000, position: [1, 1] },
        ],
      });

      const troopInfo = troopStore.getTroop("barbarian", 1);

      expect(result.unitData).toEqual({
        "barbarian#1": {
          type: "barbarian",
          level: 1,
          hitPoints: 45,
          position: [1, 1],
          effects: [],
          info: troopInfo,
          unitData: {},
          state: "idle",
        },
      });
    });
  });
});
