import { Troop } from "../../data/types";

export type ArmyTroop = {
  troop: Troop;
  state: "placed" | "ready";
};

export type Army = {
  units: ArmyTroop[];
};
