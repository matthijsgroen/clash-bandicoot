import { armyBuilder } from "../army/armyComposition";
import { addTroopToState, createBattleState } from "../combat/attack";
import { layoutBuilder } from "../layout/baseLayout";
import { BattleState } from "../types";
import { ExplosionEntity, explosion } from "./explosion";

describe("explosion behavior", () => {
  const setupBattle = (): BattleState => {
    const layout = layoutBuilder().result(); // Empty field
    const army = armyBuilder().addTroops("barbarian", 1, 3).result();
    const battleState = createBattleState(layout, army);

    addTroopToState(battleState, "barbarian", 1, [5, 5]);
    addTroopToState(battleState, "barbarian", 1, [7, 5]);
    addTroopToState(battleState, "barbarian", 1, [10, 5]);

    return battleState;
  };

  const setupExplosion = (
    data: Partial<ExplosionEntity> = {}
  ): ExplosionEntity => ({
    type: "explosion",
    aiType: "explosion",
    delay: 300,
    duration: 200,
    effectData: {
      damage: 400,
      damageDealt: false,
    },
    targetModifiers: [],
    level: 99,
    position: [5, 5],
    range: 3,
    state: "idle",
    ...data,
  });

  it("waits the specified amount of time before exploding", () => {
    const battle = setupBattle();
    const explosionData = setupExplosion({ delay: 300 });

    battle.effectData["test-explosion"] = explosionData;
    explosion(battle, "test-explosion", 20);

    expect(explosionData.delay).toEqual(280);
    expect(battle.unitData["barbarian#1"].hitPoints).toEqual(45);
    expect(battle.unitData["barbarian#2"].hitPoints).toEqual(45);
    expect(battle.unitData["barbarian#3"].hitPoints).toEqual(45);
  });

  it("hits all units within the splash range", () => {
    const battle = setupBattle();
    const explosionData = setupExplosion({ delay: 0, duration: 200, range: 3 });

    battle.effectData["test-explosion"] = explosionData;
    explosion(battle, "test-explosion", 20);

    expect(explosionData.delay).toEqual(0);
    expect(battle.unitData["barbarian#1"].hitPoints).toEqual(0);
    expect(battle.unitData["barbarian#2"].hitPoints).toEqual(0);
    expect(battle.unitData["barbarian#3"].hitPoints).toEqual(45);
    expect(explosionData.effectData.damageDealt).toBe(true);
    expect(explosionData.duration).toEqual(180);
  });

  it("removes itself from effect data when done", () => {
    const battle = setupBattle();
    const explosionData = setupExplosion({ delay: 0, duration: 0, range: 3 });

    battle.effectData["test-explosion"] = explosionData;
    explosion(battle, "test-explosion", 20);

    expect(Object.keys(battle.effectData)).toEqual([]);
  });
});
