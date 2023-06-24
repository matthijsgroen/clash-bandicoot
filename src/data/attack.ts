import { BaseLayout, LayoutBuilding } from "./baseLayout";
import "./troops";
import { Troop, troopStore } from "./troopStore";
import { createKeyStore } from "./keyStore";
import { aiHandlers } from "./ai";
import { getDestruction, getStars } from "./attackResult";

export type Placement = {
  unit: string;
  level: number;
  timestamp: number;
  position: [x: number, y: number];
};

export type Replay = {
  placement: Placement[];
};

export type BaseBuilding<
  T extends Record<string, unknown> = Record<string, unknown>,
  Settings extends Record<string, unknown> = Record<string, unknown>
> = {
  hitPoints: number;
  effects: [];
  center: [x: number, y: number];
  building: LayoutBuilding<Settings>;
  buildingData: T;
};

export type BaseData = Record<string, BaseBuilding>;

export type Unit<T extends Record<string, unknown> = Record<string, unknown>> =
  {
    hitPoints: number;
    effects: [];
    type: string;
    level: number;
    position: [x: number, y: number];
    info: Troop;
    unitData: T;
    state: string;
  };

export type UnitData = Record<string, Unit>;

export type GameState = {
  timeSpent: number;
  damage: number;
  stars: number;

  baseData: BaseData;
  unitData: UnitData;
  replay: Replay;
};

export const createInitialBaseData = (layout: BaseLayout): BaseData =>
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
  const state: GameState = {
    timeSpent: 0,
    damage: 0,
    stars: 0,

    baseData: createInitialBaseData(layout),
    unitData: {}, // place heroes from layout
    replay: { placement: [] },
  };

  const handleTick = () => {
    if (state.timeSpent > 3 * 60 * 1000) return;
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

    if (state.damage >= 1) return;
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
    getData: (): GameState => state,
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
