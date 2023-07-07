import { EntityAI } from "./type";
import { groundUnit } from "./groundUnit";
import { cannon } from "./cannon";
import { mortar } from "./mortar";
import { explosion } from "./explosion";
import { bomb } from "./bomb";

export const aiHandlers: Record<string, EntityAI> = {
  groundUnit,
  cannon,
  mortar,
  explosion,
  bomb,
};
