import { handleAttack } from "../attack";
import { layoutBuilder } from "../baseLayout";

describe("Barbarian", () => {
  describe("movement", () => {
    describe("speed test", () => {
      it("takes x seconds to reach the target", () => {
        const village = layoutBuilder()
          .placeBuilding("townhall", 1, [35, 35])
          .result();

        const attack = handleAttack(village);
        attack.placeUnit("barbarian", 1, [37, 0]);
        attack.forwardTime(400);
        const unitPlacement = attack.getData().unitData;
        // unit should have moved
        console.log(unitPlacement["barbarian#1"]);
      });
    });
  });
});
