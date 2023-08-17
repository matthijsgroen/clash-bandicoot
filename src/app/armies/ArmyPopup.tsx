import { PropsWithChildren, useState } from "react";
import { Button } from "../../ui-components/atoms/Button";
import { Dialog } from "../../ui-components/atoms/Dialog";
import { Inset } from "../../ui-components/atoms/Inset";
import { Panel } from "../../ui-components/atoms/Panel";
import { Tab } from "../../ui-components/atoms/Tab";
import { Text } from "../../ui-components/atoms/Text";
import { Toolbar, ToolbarSpacer } from "../../ui-components/atoms/Toolbar";
import {
  ArmyTray,
  Group,
  Placeholder,
  UnitButton,
} from "../../ui-components/composition/ArmyTray";
import { colorMap } from "../consts/unitColors";
import { Column } from "../components/Column";
import { EditArmy } from "./EditArmy";
import {
  getArmySize,
  getPlacementOverview,
} from "../../engine/army/armyComposition";
import { ArmyItem, getArmies, postArmy, putArmy } from "../../api/armies";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTownhallLevel } from "../../engine/army/townhallLevel";
import { getMaxArmySize } from "../../engine/army/armySize";

const ArmyRow: React.FC<PropsWithChildren> = ({ children }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "calc(100% - var(--control-size-default) - 0.5rem) var(--control-size-default)",
      gridTemplateRows: "auto auto",
      gap: "0.5rem",
    }}
  >
    {children}
  </div>
);

export const ArmyList: React.FC<{
  onEdit?: (item: ArmyItem) => void;
  armies?: ArmyItem[];
}> = ({ onEdit, armies = [] }) => {
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: postArmy,
    onSuccess: (armyItem) => {
      queryClient.invalidateQueries({ queryKey: ["armyList"] });
      onEdit?.(armyItem);
    },
    networkMode: "always",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        padding: "0.5rem",
      }}
    >
      <Panel color="seagreen">
        <Text size="small">
          Here you can create armies of your own to attack.
        </Text>
        <Toolbar>
          <ToolbarSpacer />
          <Button
            color="orange"
            width="default"
            height="small"
            onClick={() => {
              createMutation.mutate({ name: "New Army" });
            }}
          >
            + New
          </Button>
        </Toolbar>
      </Panel>
      {armies.map((armyItem) => {
        const armyTh = getTownhallLevel(armyItem.army);
        const placement = getPlacementOverview(armyItem.army);
        const groups = placement.reduce<string[]>(
          (r, u) => (r.includes(u.category) ? r : r.concat(u.category)),
          placement.length === 0 ? ["elixirTroops"] : []
        );
        const fillSpots = Math.max(7 - placement.length, 0);

        return (
          <ArmyRow>
            <Toolbar>
              <Text size="small">{armyItem.name}</Text>
              <ToolbarSpacer />
              <Text size="small">TH: {armyTh}</Text>
              <Text size="small">
                {getArmySize(armyItem.army)} / {getMaxArmySize(armyTh)}
              </Text>
            </Toolbar>
            <span />
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
            <Column>
              <Button
                color="limegreen"
                width="default"
                height={armyItem.builtIn ? "default" : "small"}
              >
                Select
              </Button>
              {!armyItem.builtIn && (
                <Button
                  color="orange"
                  width="default"
                  height="small"
                  onClick={() => onEdit?.(armyItem)}
                >
                  Edit
                </Button>
              )}
            </Column>
          </ArmyRow>
        );
      })}
    </div>
  );
};

export const ArmyPopup: React.FC<{ onClose?: VoidFunction }> = ({
  onClose,
}) => {
  const [editItem, setEditItem] = useState<null | ArmyItem>(null);

  const { data } = useQuery({
    queryKey: ["armyList"],
    queryFn: getArmies,
    networkMode: "always",
  });

  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationFn: putArmy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["armyList"] });
    },
    networkMode: "always",
  });

  return (
    <>
      <Dialog
        title={
          <Toolbar>
            <Button
              color="limegreen"
              icon
              width="default"
              height="small"
              disabled={!editItem}
              invisible={!editItem}
              onClick={() => {
                setEditItem(null);
              }}
            >
              ⬅
            </Button>
            <Tab>Army</Tab>
            <Tab active>Quick training</Tab>
          </Toolbar>
        }
        onClose={onClose}
        width="min(80vw, 30rem)"
        height="min(90vh, 22.5rem)"
      >
        {!editItem && (
          <ArmyList onEdit={(item) => setEditItem(item)} armies={data} />
        )}
        {editItem && (
          <EditArmy
            army={editItem}
            onCancel={() => {
              setEditItem(null);
            }}
            onChange={(item) => {
              updateMutation.mutate(item);
              setEditItem(null);
            }}
          />
        )}
      </Dialog>
    </>
  );
};
