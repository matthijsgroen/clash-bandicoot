import { armyBuilder } from "../army/armyComposition";
import { layoutBuilder } from "../layout/baseLayout";
import { troopStore } from "../../data/troopStore";
import { handleAttack, unitsAlive } from "./attack";

describe("attack", () => {
  describe("while nothing happens", () => {
    it("reports health", () => {
      const village = layoutBuilder()
        .placeBuilding("townhall", 1, [35, 35])
        .result();
      const army = armyBuilder().addTroops("barbarian", 1, 1).result();

      const attack = handleAttack(village, army);
      attack.forwardTime(3 * 60 * 1000);

      const result = attack.getData();

      expect(result.baseData).toEqual({
        "townhall#1": {
          hitPoints: 450,
          lastHitAt: -1,
          effects: [],
          center: [37, 37],
          state: "idle",
          visible: true,
          building: village.items["townhall#1"],
          buildingData: {},
        },
      });
      expect(result.timeSpent).toEqual(180_000);
    });

    it("reports no units alive on the battlefield", () => {
      const village = layoutBuilder()
        .placeBuilding("townhall", 1, [35, 35])
        .result();
      const army = armyBuilder().addTroops("barbarian", 1, 1).result();

      const attack = handleAttack(village, army);
      attack.forwardTime(3 * 60 * 1000);

      const battleData = attack.getData();
      expect(unitsAlive(battleData.unitData)).toEqual(0);
    });
  });

  describe("placing a troop", () => {
    it("affects the replay", () => {
      const village = layoutBuilder()
        .placeBuilding("townhall", 1, [35, 35])
        .result();
      const army = armyBuilder().addTroops("barbarian", 1, 1).result();

      const attack = handleAttack(village, army);
      attack.forwardTime(1 * 60 * 1000);
      attack.placeUnit("barbarian", 1, [1, 1]);

      const result = attack.getData();

      expect(result.timeSpent).toEqual(60_000);
      expect(result.replay).toEqual({
        placement: [
          { level: 1, unit: "barbarian", timestamp: 60_000, position: [1, 1] },
        ],
      });
    });

    it("places the unit", () => {
      const village = layoutBuilder()
        .placeBuilding("townhall", 1, [35, 35])
        .result();
      const army = armyBuilder().addTroops("barbarian", 1, 1).result();

      const attack = handleAttack(village, army);
      attack.forwardTime(1 * 60 * 1000);
      attack.placeUnit("barbarian", 1, [1, 1]);

      const result = attack.getData();

      expect(result.timeSpent).toEqual(60_000);

      const troopInfo = troopStore.getTroop("barbarian", 1);

      expect(result.unitData).toEqual({
        "barbarian#1": {
          type: "barbarian",
          level: 1,
          hitPoints: 45,
          lastHitAt: -1,
          position: [1, 1],
          effects: [],
          info: troopInfo,
          unitData: {},
          state: "idle",
        },
      });
    });

    it("updates the attacking army", () => {
      const village = layoutBuilder()
        .placeBuilding("townhall", 1, [35, 35])
        .result();
      const army = armyBuilder().addTroops("barbarian", 1, 1).result();

      const attack = handleAttack(village, army);
      attack.forwardTime(1 * 60 * 1000);
      attack.placeUnit("barbarian", 1, [1, 1]);

      const result = attack.getData();

      expect(result.timeSpent).toEqual(60_000);
      expect(result.army.units[0].state).toEqual("placed");
    });

    it("reports a unit alive on the battlefield", () => {
      const village = layoutBuilder()
        .placeBuilding("townhall", 1, [35, 35])
        .result();
      const army = armyBuilder().addTroops("barbarian", 1, 1).result();

      const attack = handleAttack(village, army);
      attack.forwardTime(1 * 60 * 1000);
      attack.placeUnit("barbarian", 1, [1, 1]);

      const battleData = attack.getData();
      expect(unitsAlive(battleData.unitData)).toEqual(1);
    });
  });
});
