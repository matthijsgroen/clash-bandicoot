import { PropsWithChildren } from "react";
import { ArmyItem, postArmy } from "../../api/armies";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Panel } from "../../ui-components/atoms/Panel";
import { Text } from "../../ui-components/atoms/Text";
import { Toolbar, ToolbarSpacer } from "../../ui-components/atoms/Toolbar";
import { Button } from "../../ui-components/atoms/Button";
import { getPlacementOverview } from "../../engine/army/armyComposition";
import {
  ArmyTray,
  Group,
  Placeholder,
  UnitButton,
} from "../../ui-components/composition/ArmyTray";
import { Inset } from "../../ui-components/atoms/Inset";
import { ArmyStats } from "./ArmyStats";
import { Column } from "../components/Column";
import { colorMap } from "../consts/unitColors";

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
  onTrain?: (item: ArmyItem) => void;
  armies?: ArmyItem[];
}> = ({ onEdit, onTrain, armies = [] }) => {
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
        const placement = getPlacementOverview(armyItem.army);
        const groups = placement.reduce<string[]>(
          (r, u) => (r.includes(u.category) ? r : r.concat(u.category)),
          placement.length === 0 ? ["elixirTroops"] : []
        );
        const fillSpots = Math.max(7 - placement.length, 0);

        return (
          <ArmyRow key={armyItem.id}>
            <ArmyStats armyItem={armyItem} />
            <span />
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
            <Column>
              {!armyItem.builtIn && (
                <Button
                  color="limegreen"
                  width="default"
                  height="small"
                  onClick={() => onEdit?.(armyItem)}
                >
                  Edit
                </Button>
              )}
              <Button
                color="limegreen"
                width="default"
                height={armyItem.builtIn ? "default" : "small"}
                onClick={() => onTrain?.(armyItem)}
              >
                Train
              </Button>
            </Column>
          </ArmyRow>
        );
      })}
    </div>
  );
};
