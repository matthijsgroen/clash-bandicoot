import { groundUnit } from "./groundUnit";
import { cannon } from "./cannon";
import { EntityAI } from "./type";

export const aiHandlers: Record<string, EntityAI> = {
  groundUnit,
  cannon,
};
