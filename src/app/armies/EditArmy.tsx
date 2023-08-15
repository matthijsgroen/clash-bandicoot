import { useState } from "react";
import { troopStore } from "../../data/troopStore";
import {
  Army,
  addTroop,
  createArmy,
  elixirTroops,
  getArmySize,
  getPlacementOverview,
  removeTroop,
} from "../../engine/armyComposition";
import { Button } from "../../ui-components/atoms/Button";
import { Icon } from "../../ui-components/atoms/Icon";
import { Inset } from "../../ui-components/atoms/Inset";
import { Text } from "../../ui-components/atoms/Text";
import { Toolbar, ToolbarSpacer } from "../../ui-components/atoms/Toolbar";
import {
  ArmyTray,
  Group,
  Placeholder,
  UnitButton,
} from "../../ui-components/composition/ArmyTray";
import { DEFAULT_COLOR } from "../../ui-components/composition/ArmyTray/UnitButton";
import { colorMap } from "../consts/unitColors";

export const EditArmy: React.FC<{
  onChange?: (army: Army) => void;
  army: Army;
}> = ({ army: initialArmy, onChange }) => {
  const [troopLevels, setTroopLevels] = useState<Record<string, number>>({});
  const [army, setArmy] = useState(initialArmy);

  const placement = getPlacementOverview(army);
  const groups = placement.reduce<string[]>(
    (r, u) => (r.includes(u.category) ? r : r.concat(u.category)),
    placement.length === 0 ? ["elixirTroops"] : []
  );

  const fillSpots = Math.max(9 - placement.length, 0);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <Toolbar>
        <Text size="small">{army.name}</Text>
        <ToolbarSpacer />
        <Text size="small">{getArmySize(army)} / 220</Text>
      </Toolbar>
      <Inset>
        <ArmyTray>
          {groups.map((g, i, l) => (
            <Group>
              {placement
                .filter((p) => p.category === g)
                .map((p) => (
                  <UnitButton
                    portraitColor={colorMap[p.type]}
                    label={p.type}
                    amount={p.available}
                    level={p.level}
                  >
                    <Button
                      color={"red"}
                      icon
                      width="mini"
                      height="mini"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setArmy((army) => removeTroop(army, p.type, p.level));
                      }}
                    >
                      -
                    </Button>
                  </UnitButton>
                ))}
              {i === l.length - 1 &&
                Array(fillSpots)
                  .fill(null)
                  .map((_v, i) => <Placeholder key={i} size="large" />)}
            </Group>
          ))}
        </ArmyTray>
      </Inset>
      <Toolbar>
        <ToolbarSpacer />
        <Button
          color="red"
          width="default"
          height="default"
          onClick={() => setArmy(createArmy())}
        >
          <Icon>🗑️</Icon>
        </Button>
        <Button color="red" width="large" height="default">
          Cancel
        </Button>
        <Button color="limegreen" width="large" height="default">
          ⬇ Save
        </Button>
      </Toolbar>
      <Inset>
        <ArmyTray>
          <Group rows={2} width="large">
            {elixirTroops.map((type) => {
              const level = troopLevels[type] ?? 1;
              const info = troopStore.getTroop(type, level);
              return (
                <UnitButton
                  key={type}
                  portraitColor={colorMap[type]}
                  label={type}
                  level={level}
                  size={info?.size}
                  onClick={() => {
                    setArmy((army) => addTroop(army, type, level, 1));
                  }}
                >
                  <Button
                    color={DEFAULT_COLOR}
                    icon
                    width="mini"
                    height="mini"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    i
                  </Button>
                </UnitButton>
              );
            })}
          </Group>
        </ArmyTray>
      </Inset>
    </div>
  );
};
