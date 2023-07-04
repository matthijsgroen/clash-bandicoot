import "../troops";
import { troopStore } from "../troopStore";
import { createKeyStore } from "../utils/keyStore";
import { aiHandlers } from "../ai";
import { getDestruction, getStars } from "./attackResult";
import {
  BattleBaseData,
  BaseLayout,
  BattleState,
  BattleUnitData,
} from "../types";
import { createObstacleGrid } from "../pathfinding/grid";
import { Army, canDeployTroops, placeUnit } from "../armyComposition";

export const createInitialBaseData = (layout: BaseLayout): BattleBaseData =>
  Object.fromEntries(
    Object.entries(layout.items).map(([id, building]) => {
      return [
        id,
        {
          hitPoints: building.info.hitPoints,
          building,
          center: [
            building.position[0] + building.info.size[0] / 2,
            building.position[1] + building.info.size[1] / 2,
          ],
          effects: [],
          state: "idle",
          buildingData: {},
        },
      ];
    })
  );

const TICK_SPEED = 20; // 50 FPS
export const DEFAULT_DURATION = 3 * 60 * 1000;

export const createBattleState = (
  layout: BaseLayout,
  army: Army,
  duration = DEFAULT_DURATION
): BattleState => {
  const baseData = createInitialBaseData(layout);
  return {
    timeSpent: 0,
    timeLeft: duration,
    damage: 0,
    stars: 0,
    state: "battle",

    baseData,
    layout,
    army,

    grid: createObstacleGrid(layout, baseData),
    unitData: {}, // place heroes from layout
    replay: { placement: [] },
  };
};

export const unitsAlive = (unitData: BattleUnitData): number =>
  Object.values(unitData).filter((unit) => unit.hitPoints > 0).length;

export const handleAttack = (
  layout: BaseLayout,
  army: Army,
  duration = DEFAULT_DURATION
) => {
  const unitKeys = createKeyStore();
  const state = createBattleState(layout, army, duration);

  const handleTick = () => {
    if (state.state === "ended") {
      return;
    }
    if (state.timeLeft <= 0) {
      state.state = "ended";
      Object.values(state.unitData).forEach((u) => {
        if (u.state === "attacking") {
          u.state = "idle";
        }
      });
      return;
    }
    if (!unitsAlive(state.unitData) && !canDeployTroops(state.army)) {
      state.timeLeft = 0;
      return;
    }
    state.timeSpent += TICK_SPEED;
    state.timeLeft = Math.max(state.timeLeft - TICK_SPEED, 0);

    for (const unitId in state.unitData) {
      const unit = state.unitData[unitId];
      const aiHandler = unit.info.aiType;
      if (aiHandler) {
        aiHandlers[aiHandler](state, unitId, TICK_SPEED);
      }
    }
    for (const buildingId in state.baseData) {
      const building = state.baseData[buildingId];
      const aiHandler = building.building.info.aiType;
      if (aiHandler) {
        aiHandlers[aiHandler](state, buildingId, TICK_SPEED);
      }
    }

    if (state.damage >= 1) {
      state.state = "ended";
    }
    state.damage = getDestruction(state.baseData);
    state.stars = getStars(state.baseData);
  };

  return {
    playTick: () => {
      handleTick();
    },
    forwardTime: (amountMs: number) => {
      const ticks = amountMs / TICK_SPEED;
      for (let i = 0; i < ticks; i++) {
        handleTick();
      }
    },
    getData: (): BattleState => state,
    placeUnit: (
      type: string,
      level: number,
      position: [x: number, y: number]
    ) => {
      const troop = troopStore.getTroop(type, level);
      if (!troop) return;
      state.army = placeUnit(state.army, type, level);

      state.replay.placement.push({
        level,
        unit: type,
        position,
        timestamp: state.timeSpent,
      });
      const key = unitKeys.getKey(type);
      state.unitData = {
        ...state.unitData,
        [key]: {
          type,
          level,
          position,
          effects: [],
          hitPoints: troop.hitPoints,
          info: troop,
          unitData: {},
          state: "idle",
        },
      };
    },
  };
};
