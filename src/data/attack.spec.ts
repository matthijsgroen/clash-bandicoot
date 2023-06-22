import { handleAttack } from "./attack";
import { layoutBuilder } from "./baseLayout";

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
          maxHitPoints: 450,
          effects: [],
          type: "townhall",
        },
      });
      expect(result.timeSpent).toEqual(180_000);
    });
  });
});
