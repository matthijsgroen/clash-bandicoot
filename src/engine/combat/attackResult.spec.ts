import { createInitialBaseData } from "./attack";
import { layoutBuilder } from "../layout/baseLayout";
import { BattleBaseData } from "../types";
import { getDestruction, getStars } from "./attackResult";

describe("attack result", () => {
  const layout = layoutBuilder()
    .placeBuilding("townhall", 1, [10, 10])
    .placeBuilding("barracks", 1, [15, 10])
    .placeBuilding("armycamp", 1, [20, 10])
    .placeBuilding("armycamp", 1, [20, 15])
    .result();
  const initBaseData: BattleBaseData = createInitialBaseData(layout);

  describe("total destruction", () => {
    it("returns 0 if all buildings are full health", () => {
      const baseData: BattleBaseData = initBaseData;

      expect(getDestruction(baseData)).toEqual(0);
    });

    it("returns 1 if all buildings are destroyed", () => {
      const baseData: BattleBaseData = {
        "townhall#1": {
          ...initBaseData["townhall#1"],
          hitPoints: 0,
        },
        "barracks#1": {
          ...initBaseData["barracks#1"],
          hitPoints: 0,
        },
        "armycamp#1": {
          ...initBaseData["armycamp#1"],
          hitPoints: 0,
        },
      };

      expect(getDestruction(baseData)).toEqual(1);
    });

    it("only counts fully destroyed buildings", () => {
      const baseData: BattleBaseData = {
        "townhall#1": {
          ...initBaseData["townhall#1"],
          hitPoints: 10,
        },
        "townhall#2": {
          ...initBaseData["townhall#1"],
          hitPoints: 0,
        },
        "armycamp#1": {
          ...initBaseData["armycamp#1"],
          hitPoints: 0,
        },
        "armycamp#2": {
          ...initBaseData["armycamp#2"],
          hitPoints: 450,
        },
      };

      expect(getDestruction(baseData)).toEqual(0.5);
    });
  });

  describe("getStars", () => {
    it("returns 0 stars for healthy base", () => {
      const baseData: BattleBaseData = {
        "townhall#1": {
          ...initBaseData["townhall#1"],
          hitPoints: 450,
        },
        "barracks#1": {
          ...initBaseData["barracks#1"],
          hitPoints: 450,
        },
        "armycamp#1": {
          ...initBaseData["armycamp#1"],
          hitPoints: 450,
        },
      };
      expect(getStars(baseData)).toEqual(0);
    });

    it("returns 1 star for destroyed townhall", () => {
      const baseData: BattleBaseData = {
        "townhall#1": {
          ...initBaseData["townhall#1"],
          hitPoints: 0,
        },
        "barracks#1": {
          ...initBaseData["barracks#1"],
          hitPoints: 450,
        },
        "armycamp#1": {
          ...initBaseData["armycamp#1"],
          hitPoints: 450,
        },
      };
      expect(getStars(baseData)).toEqual(1);
    });

    it("returns 1 star for over 50% destruction", () => {
      const baseData: BattleBaseData = {
        "townhall#1": {
          ...initBaseData["townhall#1"],
          hitPoints: 450,
        },
        "barracks#1": {
          ...initBaseData["barracks#1"],
          hitPoints: 0,
        },
        "armycamp#1": {
          ...initBaseData["armycamp#1"],
          hitPoints: 0,
        },
      };
      expect(getStars(baseData)).toEqual(1);
    });

    it("returns 2 stars for over 50% destruction including townhall", () => {
      const baseData: BattleBaseData = {
        "townhall#1": {
          ...initBaseData["townhall#1"],
          hitPoints: 0,
        },
        "barracks#1": {
          ...initBaseData["barracks#1"],
          hitPoints: 450,
        },
        "armycamp#1": {
          ...initBaseData["armycamp#1"],
          hitPoints: 0,
        },
      };
      expect(getStars(baseData)).toEqual(2);
    });

    it("returns 3 stars for full destruction", () => {
      const baseData: BattleBaseData = {
        "townhall#1": {
          ...initBaseData["townhall#1"],
          hitPoints: 0,
        },
        "barracks#1": {
          ...initBaseData["barracks#1"],
          hitPoints: 0,
        },
        "armycamp#1": {
          ...initBaseData["armycamp#1"],
          hitPoints: 0,
        },
      };
      expect(getStars(baseData)).toEqual(3);
    });
  });
});
