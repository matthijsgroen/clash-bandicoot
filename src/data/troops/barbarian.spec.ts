import { armyBuilder } from "../armyComposition";
import { handleAttack } from "../combat/attack";
import { layoutBuilder } from "../layout/baseLayout";

describe("Barbarian", () => {
  describe("movement", () => {
    describe("speed test", () => {
      it("takes x seconds to reach the target", () => {
        const village = layoutBuilder()
          .placeBuilding("townhall", 1, [35, 35])
          .result();

        const army = armyBuilder().addTroops("barbarian", 1, 1).result();

        const attack = handleAttack(village, army);
        attack.placeUnit("barbarian", 1, [37, 0]);
        attack.forwardTime(4000);
        const unitPlacement = attack.getData().unitData;
        expect(unitPlacement["barbarian#1"].position[1]).toBeCloseTo(8, 1);
      });
    });
  });
});
