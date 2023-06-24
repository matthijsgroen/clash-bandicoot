import { GameState } from "../types";

export type EntityAI = (data: GameState, item: string, delta: number) => void;
