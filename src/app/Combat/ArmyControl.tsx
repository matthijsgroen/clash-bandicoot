import { useAtomValue } from "jotai";
import {
  ArmyTray,
  Group,
  Placeholder,
  UnitButton,
} from "../../ui-components/composition/ArmyTray";
import { getPlacementOverview } from "../../engine/army/armyComposition";
import styles from "./ArmyControl.module.css";
import { armyAtom } from "./combatState";
import { TroopType } from "../../data/types";
import { colorMap } from "../consts/unitColors";

export const ArmyControl: React.FC<{
  onSelect?: (type: TroopType, level: number) => void;
  selected?: [type: TroopType, level: number];
}> = ({ onSelect, selected }) => {
  const army = useAtomValue(armyAtom);
  const placement = getPlacementOverview(army);
  const groups = placement.reduce<string[]>(
    (r, u) => (r.includes(u.category) ? r : r.concat(u.category)),
    []
  );
  const fillSpots = Math.max(11 - placement.length, 0);

  return (
    <ArmyTray className={styles.armyControl} darkOverlay>
      {groups.map((g, i, l) => (
        <Group key={g}>
          {placement
            .filter((p) => p.category === g)
            .map((p) => (
              <UnitButton
                key={`${p.type}${p.level}`}
                portraitColor={colorMap[p.type]}
                label={p.type}
                level={p.level}
                disabled={p.available === 0}
                amount={p.available}
                selected={
                  p.available > 0 &&
                  selected &&
                  selected[0] === p.type &&
                  selected[1] === p.level
                }
                onClick={() => {
                  onSelect?.(p.type, p.level);
                }}
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
