import { useAtomValue } from "jotai";
import { armyAtom } from "./armyState";
import { Inset } from "../../ui-components/atoms/Inset";
import {
  ArmyTray,
  Group,
  Placeholder,
  UnitButton,
} from "../../ui-components/composition/ArmyTray";
import {
  getArmySize,
  getPlacementOverview,
} from "../../engine/army/armyComposition";
import { colorMap } from "../consts/unitColors";
import { Toolbar, ToolbarSpacer } from "../../ui-components/atoms/Toolbar";
import { Text } from "../../ui-components/atoms/Text";
import { getMaxArmySize } from "../../engine/army/armySize";
import { getTownhallLevel } from "../../engine/army/townhallLevel";

export const ShowActiveArmy: React.FC = () => {
  const armyItem = useAtomValue(armyAtom);

  const placement =
    armyItem === null ? [] : getPlacementOverview(armyItem.army);
  const groups = placement.reduce<string[]>(
    (r, u) => (r.includes(u.category) ? r : r.concat(u.category)),
    placement.length === 0 ? ["elixirTroops"] : []
  );
  const fillSpots = Math.max(7 - placement.length, 0);
  const armyTh = armyItem ? getTownhallLevel(armyItem.army) : 1;

  return (
    <>
      <Toolbar>
        <Text size="small">
          {armyItem === null ? "Nothing trained" : armyItem.name}
        </Text>
        <ToolbarSpacer />
        <Text size="small">TH: {armyTh}</Text>
        <Text size="small">
          {armyItem ? getArmySize(armyItem.army) : 0} / {getMaxArmySize(armyTh)}
        </Text>
      </Toolbar>
      <Inset>
        <ArmyTray>
          {groups.map((g, i, l) => (
            <Group key={g}>
              {placement
                .filter((p) => p.category === g)
                .map((p) => (
                  <UnitButton
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
    </>
  );
};
