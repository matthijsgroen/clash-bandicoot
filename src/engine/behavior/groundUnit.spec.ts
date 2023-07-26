import { armyBuilder } from "../armyComposition";
import { addTroopToState, createBattleState } from "../combat/attack";
import { layoutBuilder } from "../layout/baseLayout";
import { BattleState, BattleUnitState } from "../types";
import { GroundUnitData, groundUnit } from "./groundUnit";

const setupBattle = (
  setupBase: (
    layout: ReturnType<typeof layoutBuilder>
  ) => ReturnType<typeof layoutBuilder>
): BattleState => {
  const layout = setupBase(layoutBuilder()).result();
  const army = armyBuilder()
    .addTroops("goblin", 1, 3)
    .addTroops("giant", 1, 3)
    .addTroops("archer", 1, 3)
    .result();
  return createBattleState(layout, army);
};

// Applies to: Barbarian, Archer, Giant, Goblin, PEKKA, Wizard, Golem, Witch, Ice Golem
describe("Ground Unit behavior", () => {
  describe("Fase 1: Target selection & Pathfinding", () => {
    describe("target preference", () => {
      const createBase = () =>
        setupBattle((base) =>
          base
            .placeBuilding("townhall", 1, [10, 10])
            .placeBuilding("armycamp", 1, [30, 30])
        );

      describe("when having no preference", () => {
        it("selects a target from its target preference", () => {
          const battleState = createBase();
          const unitKey = addTroopToState(battleState, "archer", 1, [25, 25]);
          expect(unitKey).not.toBeNull();

          groundUnit(battleState, unitKey as string, 20);
          expect(battleState.unitData[unitKey as string]).toHaveProperty(
            "unitData.currentTarget",
            "armycamp#1"
          );
        });
      });

      describe("when having a preference", () => {
        it("selects a target from its target preference", () => {
          const battleState = createBase();
          const unitKey = addTroopToState(battleState, "goblin", 1, [25, 25]);
          expect(unitKey).not.toBeNull();

          groundUnit(battleState, unitKey as string, 20);
          expect(battleState.unitData[unitKey as string]).toHaveProperty(
            "unitData.currentTarget",
            "townhall#1"
          );
        });
      });

      describe("when preference is not available", () => {
        it("selects a random target it preferred target is not available", () => {
          const battleState = createBase();
          const unitKey = addTroopToState(battleState, "giant", 1, [25, 25]);
          expect(unitKey).not.toBeNull();

          groundUnit(battleState, unitKey as string, 20);
          expect(battleState.unitData[unitKey as string]).toHaveProperty(
            "unitData.currentTarget",
            "armycamp#1"
          );
        });
      });
    });

    describe("troop distribution on targets", () => {
      const createBase = () =>
        setupBattle((base) =>
          base
            .placeBuilding("elixirstorage", 1, [13, 10])
            .placeBuilding("elixirstorage", 1, [10, 13])
        );

      it("selects target from viable options with equal distance based on groupIndex", () => {
        const battleState = createBase();
        const goblin1 = addTroopToState(
          battleState,
          "goblin",
          1,
          [10, 10]
        ) as string;
        expect(goblin1).not.toBeNull();
        const groundUnit1 = battleState.unitData[
          goblin1
        ] as BattleUnitState<GroundUnitData>;
        groundUnit1.unitData.groupIndex = 1;

        const goblin2 = addTroopToState(
          battleState,
          "goblin",
          1,
          [10, 10]
        ) as string;
        expect(goblin2).not.toBeNull();
        const groundUnit2 = battleState.unitData[
          goblin2
        ] as BattleUnitState<GroundUnitData>;
        groundUnit2.unitData.groupIndex = 0;

        // Both are at the same location, but have different groupIndices. Resulting in different targets

        groundUnit(battleState, "goblin#1", 20);
        groundUnit(battleState, "goblin#2", 20);

        const target1 = battleState.unitData["goblin#1"].unitData.currentTarget;
        const target2 = battleState.unitData["goblin#2"].unitData.currentTarget;

        expect(target1).toEqual("elixirstorage#2");
        expect(target2).toEqual("elixirstorage#1");
      });
    });

    it.todo("takes into account its attack range for pathfinding");
    it.todo("assigns a groupIndex based on other units having the same target");
  });

  describe("Fase 2: Movement", () => {
    it.todo("moves towards next waypoint");
    it.todo("shifts waypoint for next one if at waypoint");
    it.todo("moves back to fase 1 of target is not available anymore");
  });

  describe("Fase 3: Attack", () => {
    it.todo("waits its attack delay before strike");
    it.todo("applies damage to target");
  });
});
