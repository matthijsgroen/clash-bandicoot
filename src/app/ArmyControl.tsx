import {
  ArmyTray,
  Group,
  Placeholder,
  UnitButton,
} from "../components/composition/ArmyTray";
import { Army } from "../data/armyComposition";
import styles from "./ArmyControl.module.css";

export const ArmyControl: React.FC<{ army: Army }> = ({ army }) => {
  return (
    <ArmyTray className={styles.armyControl}>
      <Group>
        <UnitButton color={"red"} label={"Giant"} />
        <UnitButton color={"green"} label={"Goblin"} level={2} selected />
        <UnitButton color={"pink"} label={"Archer"} level={2} amount={5} />
        <Placeholder />
      </Group>
      <Group>
        <UnitButton
          color={"#bb0"}
          label={"Barbarian"}
          level={1}
          amount={0}
          disabled
        />
        <Placeholder />
        <Placeholder />
        <Placeholder />
      </Group>
    </ArmyTray>
  );
};
