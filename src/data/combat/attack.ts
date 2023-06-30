import "../troops";
import { troopStore } from "../troopStore";
import { createKeyStore } from "../utils/keyStore";
import { aiHandlers } from "../ai";
import { getDestruction, getStars } from "./attackResult";
import { BattleBaseData, BaseLayout, BattleState } from "../types";
import { createObstacleGrid } from "../pathfinding/grid";

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
          buildingData: {},
        },
      ];
    })
  );

const TICK_SPEED = 20; // 50 FPS

export const handleAttack = (layout: BaseLayout) => {
  const unitKeys = createKeyStore();
  const baseData = createInitialBaseData(layout);
  const state: BattleState = {
    timeSpent: 0,
    damage: 0,
    stars: 0,
    state: "battle",

    baseData,
    layout,

    grid: createObstacleGrid(layout, baseData),
    unitData: {}, // place heroes from layout
    replay: { placement: [] },
  };

  const handleTick = () => {
    if (state.state === "ended") {
      return;
    }
    if (state.timeSpent > 3 * 60 * 1000) {
      state.state = "ended";
      return;
    }
    state.timeSpent += TICK_SPEED;
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
