import { BaseLayout, LayoutBuilding } from "./baseLayout";
import "./buildings";
import { buildingStore } from "./buildingStore";
import { Troop, troopStore } from "./troopStore";
import { createKeyStore } from "./keyStore";
import "./troops";
import { aiHandlers } from "./ai";

export type Placement = {
  unit: string;
  level: number;
  timestamp: number;
  position: [x: number, y: number];
};

export type Replay = {
  placement: Placement[];
};

export type BaseData = Record<
  string,
  {
    hitPoints: number;
    maxHitPoints: number;
    effects: [];
    building: LayoutBuilding;
  }
>;

export type UnitData = Record<
  string,
  {
    hitPoints: number;
    effects: [];
    type: string;
    level: number;
    position: [x: number, y: number];
    info: Troop;
    unitData: Record<string, unknown>;
  }
>;

export type GameState = {
  timeSpent: number;
  baseData: BaseData;
  unitData: UnitData;
  replay: Replay;
};

const createInitialBaseData = (layout: BaseLayout): BaseData =>
  Object.fromEntries(
    Object.entries(layout.items).map(([id, building]) => {
      const maxHitPoints =
        buildingStore.getBuilding(building.buildingType, building.buildingLevel)
          ?.hitPoints ?? 0;

      return [
        id,
        {
          hitPoints: maxHitPoints,
          maxHitPoints,
          building,
          effects: [],
        },
      ];
    })
  );

const TICK_SPEED = 20; // 50 FPS

export const handleAttack = (layout: BaseLayout) => {
  const unitKeys = createKeyStore();
  const state: GameState = {
    timeSpent: 0,
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
        },
      };
    },
  };
};
