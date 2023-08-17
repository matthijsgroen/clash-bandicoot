import { armyBuilder } from "../engine/army/armyComposition";

export const army = armyBuilder()
  .addTroops("giant", 2, 13)
  .addTroops("goblin", 2, 11)
  .addTroops("wallbreaker", 2, 2)
  .addTroops("archer", 2, 5)
  .addTroops("barbarian", 4, 10)
  .result();
