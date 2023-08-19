import { ArmyItem } from "../../api/armies";
import { getArmySize } from "../../engine/army/armyComposition";
import { getMaxArmySize } from "../../engine/army/armySize";
import { getArmyTownhallLevel } from "../../engine/army/townhallLevel";
import { MiniStat } from "../../ui-components/composition/MiniStat";
import { Text } from "../../ui-components/atoms/Text";
import { Toolbar, ToolbarSpacer } from "../../ui-components/atoms/Toolbar";

export const ArmyStats: React.FC<{ armyItem?: ArmyItem }> = ({ armyItem }) => {
  const armyTh = armyItem ? getArmyTownhallLevel(armyItem.army) : 1;
  return (
    <Toolbar>
      <Text size="small">{armyItem ? armyItem.name : "<empty>"}</Text>
      <ToolbarSpacer />
      <MiniStat label={"TH:"} stat={`${armyTh}`} />
      <MiniStat
        label={"Capacity:"}
        stat={`${armyItem ? getArmySize(armyItem.army) : 0} / ${getMaxArmySize(
          armyTh
        )}`}
      />
    </Toolbar>
  );
};
