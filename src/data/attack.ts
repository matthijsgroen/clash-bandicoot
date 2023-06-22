import { BaseLayout } from "./baseLayout";
import "./buildings";
import { buildingStore } from "./buildingStore";
import "./troops";

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
  { hitPoints: number; maxHitPoints: number; effects: []; type: string }
>;

export type GameState = {
  timeSpent: number;
  baseData: BaseData;
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
          type: building.buildingType,
          effects: [],
        },
      ];
    })
  );

const TICK_SPEED = 20; // 50 FPS

export const handleAttack = (layout: BaseLayout) => {
  const state: GameState = {
    timeSpent: 0,
    baseData: createInitialBaseData(layout),
    replay: { placement: [] },
  };

  const handleTick = () => {
    if (state.timeSpent > 3 * 60 * 1000) return;
    state.timeSpent += TICK_SPEED;
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
    ) => {},
  };
};
