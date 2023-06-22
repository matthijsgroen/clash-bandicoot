import { GameState } from "../attack";

export type EntityAI = (data: GameState, item: string, delta: number) => void;
