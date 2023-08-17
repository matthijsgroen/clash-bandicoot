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
} from "../../engine/army/armyComposition";
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
import {
  DEFAULT_COLOR,
  UnitButtonLayout,
} from "../../ui-components/composition/ArmyTray/UnitButton";
import { colorMap } from "../consts/unitColors";
import { createPortal } from "react-dom";
import { Dialog } from "../../ui-components/atoms/Dialog";
import { TroopType } from "../../data/types";
import { getMaxArmySize } from "../../engine/army/armySize";
import { getTownhallLevel } from "../../engine/army/townhallLevel";
import { setUnitTypeLevel } from "../../engine/army/unitLevels";

export const EditArmy: React.FC<{
  onChange?: (army: Army) => void;
  onCancel?: VoidFunction;
  army: Army;
}> = ({ army: initialArmy, onChange, onCancel }) => {
  const [troopLevels, setTroopLevels] = useState<Record<string, number>>({});
  const [showTroopInfo, setShowTroopInfo] = useState<null | TroopType>(null);
  const [army, setArmy] = useState(initialArmy);

  const placement = getPlacementOverview(army);
  const groups = placement.reduce<string[]>(
    (r, u) => (r.includes(u.category) ? r : r.concat(u.category)),
    placement.length === 0 ? ["elixirTroops"] : []
  );

  const troopInfo = showTroopInfo
    ? troopStore.getTroop(showTroopInfo, troopLevels[showTroopInfo] ?? 1)
    : undefined;

  const fillSpots = Math.max(9 - placement.length, 0);

  const townhall = getTownhallLevel(army);

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
        <Text size="small">Townhall: {townhall}</Text>
        <Text size="small">
          Capacity: {getArmySize(army)} / {getMaxArmySize(townhall)}
        </Text>
      </Toolbar>
      <Inset>
        <ArmyTray>
          {groups.map((g, i, l) => (
            <Group key={g}>
              {placement
                .filter((p) => p.category === g)
                .map((p) => (
                  <UnitButtonLayout
                    unitButton={
                      <UnitButton
                        portraitColor={colorMap[p.type]}
                        label={p.type}
                        amount={p.available}
                        level={p.level === 1 ? undefined : p.level}
                      />
                    }
                    miniButton={
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
                    }
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
        <Button
          color="red"
          width="large"
          height="default"
          disabled={!onCancel}
          onClick={() => onCancel?.()}
        >
          Cancel
        </Button>
        <Button
          color="limegreen"
          width="large"
          height="default"
          disabled={!onChange}
          onClick={() => onChange?.(army)}
        >
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
                <UnitButtonLayout
                  bottomAmount
                  unitButton={
                    <UnitButton
                      key={type}
                      portraitColor={colorMap[type]}
                      label={type}
                      level={level === 1 ? undefined : level}
                      size={info?.size}
                      onClick={() => {
                        setArmy((army) => addTroop(army, type, level, 1));
                      }}
                    />
                  }
                  miniButton={
                    <Button
                      color={DEFAULT_COLOR}
                      icon
                      width="mini"
                      height="mini"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowTroopInfo(type);
                      }}
                    >
                      i
                    </Button>
                  }
                />
              );
            })}
          </Group>
        </ArmyTray>
      </Inset>
      {troopInfo &&
        createPortal(
          <Dialog
            title={`${troopInfo.type
              .slice(0, 1)
              .toLocaleUpperCase()}${troopInfo.type.slice(1)} (Level ${
              troopInfo.level
            })`}
            onClose={() => setShowTroopInfo(null)}
            height={"14rem"}
          >
            <Text element="p" marginBottom marginTop>
              Damage per second:
              {troopInfo.damage / troopInfo.attackSpeed}
            </Text>
            <Text element="p" marginBottom marginTop>
              Hitpoints: {troopInfo.hitPoints}
            </Text>
            <Text element="p" marginBottom marginTop>
              Housing space: {troopInfo.size}
            </Text>
            <Toolbar>
              <Button
                color="limegreen"
                width="large"
                height="default"
                disabled={
                  !troopStore.getTroop(troopInfo.type, troopInfo.level + 1)
                }
                onClick={() => {
                  setArmy((army) =>
                    setUnitTypeLevel(army, troopInfo.type, troopInfo.level + 1)
                  );
                  setTroopLevels((levels) => {
                    return {
                      ...levels,
                      [troopInfo.type]: troopInfo.level + 1,
                    };
                  });
                }}
              >
                Level up
              </Button>
              <ToolbarSpacer />
              <Button
                color="limegreen"
                width="large"
                height="default"
                disabled={!(troopInfo.level > 1)}
                onClick={() => {
                  setArmy((army) =>
                    setUnitTypeLevel(army, troopInfo.type, troopInfo.level - 1)
                  );
                  setTroopLevels((levels) => {
                    return {
                      ...levels,
                      [troopInfo.type]: troopInfo.level - 1,
                    };
                  });
                }}
              >
                Level down
              </Button>
            </Toolbar>
          </Dialog>,
          document.body
        )}
    </div>
  );
};
