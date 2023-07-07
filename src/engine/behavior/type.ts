import { BattleState } from "../types";

export type EntityAI = (data: BattleState, item: string, delta: number) => void;
