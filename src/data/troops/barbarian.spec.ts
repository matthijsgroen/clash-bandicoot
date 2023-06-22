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
      });
    });
  });
});
