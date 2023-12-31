import { EntityAI } from "./type";
import { groundUnit } from "./groundUnit";
import { cannon } from "./cannon";
import { mortar } from "./mortar";
import { explosion } from "./explosion";
import { attackerExplosion } from "./attackerExplosion";
import { bomb } from "./bomb";
import { wallBreaker } from "./wallbreaker";
import { fireballs } from "./fireballs";
import { bomber } from "./bomber";

export const aiHandlers: Record<string, EntityAI> = {
  groundUnit,
  cannon,
  mortar,
  explosion,
  bomb,
  wallBreaker,
  attackerExplosion,
  fireballs,
  bomber,
};
