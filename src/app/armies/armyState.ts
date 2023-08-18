import { atom } from "jotai";
import { ArmyItem } from "../../api/armies";

export const armyAtom = atom<null | ArmyItem>(null);
