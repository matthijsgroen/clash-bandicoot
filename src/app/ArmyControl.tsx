import { useAtomValue } from "jotai";
import {
  ArmyTray,
  Group,
  Placeholder,
  UnitButton,
} from "../ui-components/composition/ArmyTray";
import { getPlacementOverview } from "../data/armyComposition";
import styles from "./ArmyControl.module.css";
import { armyAtom } from "./combatState";

const colorMap: Record<string, string> = {
  giant: "red",
  archer: "pink",
  barbarian: "#bb0",
  goblin: "green",
};

export const ArmyControl: React.FC = () => {
  const army = useAtomValue(armyAtom);
  const placement = getPlacementOverview(army);
  const groups = placement.reduce<string[]>(
    (r, u) => (r.includes(u.category) ? r : r.concat(u.category)),
    []
  );
  const fillSpots = Math.max(11 - placement.length, 0);

  return (
    <ArmyTray className={styles.armyControl}>
      {groups.map((g, i, l) => (
        <Group key={g}>
          {placement
            .filter((p) => p.category === g)
            .map((p) => (
              <UnitButton
                key={`${p.type}${p.level}`}
                color={colorMap[p.type]}
                label={p.type}
                level={p.level}
                disabled={p.available === 0}
                amount={p.available}
              />
            ))}
          {i === l.length - 1 &&
            Array(fillSpots)
              .fill(null)
              .map((_v, i) => <Placeholder key={i} />)}
        </Group>
      ))}
    </ArmyTray>
  );
};
