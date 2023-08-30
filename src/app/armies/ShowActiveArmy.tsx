import { useAtomValue } from "jotai";
import { armyAtom } from "./armyState";
import { Inset } from "../../ui-components/atoms/Inset";
import {
  ArmyTray,
  Group,
  Placeholder,
  UnitButton,
} from "../../ui-components/composition/ArmyTray";
import { getPlacementOverview } from "../../engine/army/armyComposition";
import { colorMap } from "../consts/unitColors";
import { ArmyStats } from "./ArmyStats";

export const ShowActiveArmy: React.FC = () => {
  const armyItem = useAtomValue(armyAtom);

  const placement =
    armyItem === null ? [] : getPlacementOverview(armyItem.army);
  const groups = placement.reduce<string[]>(
    (r, u) => (r.includes(u.category) ? r : r.concat(u.category)),
    placement.length === 0 ? ["elixirTroops"] : []
  );
  const fillSpots = Math.max(7 - placement.length, 0);

  return (
    <div
      style={{
        padding: "0.5rem",
      }}
    >
      <ArmyStats armyItem={armyItem ?? undefined} />
      <Inset>
        <ArmyTray>
          {groups.map((g, i, l) => (
            <Group key={g}>
              {placement
                .filter((p) => p.category === g)
                .map((p) => (
                  <UnitButton
                    key={p.type}
                    portraitColor={colorMap[p.type]}
                    label={p.type}
                    amount={p.available}
                    level={p.level === 1 ? undefined : p.level}
                  />
                ))}
              {i === l.length - 1 &&
                Array(fillSpots)
                  .fill(null)
                  .map((_v, i) => <Placeholder key={i} size="large" />)}
            </Group>
          ))}
        </ArmyTray>
      </Inset>
    </div>
  );
};
