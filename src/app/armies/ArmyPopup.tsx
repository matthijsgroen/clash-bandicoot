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
import { Column } from "../villages/VillagePopup";

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

export const ArmyPopup: React.FC<{ onClose?: VoidFunction }> = ({
  onClose,
}) => {
  const [editMode, setEditMode] = useState(false);
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
              disabled={!editMode}
              invisible={!editMode}
              onClick={() => {
                setEditMode(false);
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
        height="min(80vh, 22.5rem)"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            padding: "0.5rem",
          }}
        >
          {!editMode && (
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
                    // createMutation.mutate({ name: "New Village" });
                  }}
                >
                  + New
                </Button>
              </Toolbar>
            </Panel>
          )}
          <ArmyRow>
            <Toolbar>
              <Text size="small">GoWiPe</Text>
              <ToolbarSpacer />
              <Text size="small">2 / 220</Text>
            </Toolbar>
            <span />
            <Inset>
              <ArmyTray>
                <Group>
                  <UnitButton
                    portraitColor={colorMap["barbarian"]}
                    label="Barbarian"
                    amount={1}
                    level={2}
                  />
                  <UnitButton
                    portraitColor={colorMap["archer"]}
                    label="Archer"
                    amount={1}
                  />
                  <Placeholder />
                  <Placeholder />
                  <Placeholder />
                  <Placeholder />
                  <Placeholder />
                  <Placeholder />
                </Group>
              </ArmyTray>
            </Inset>
            <Column>
              <Button color="limegreen" width="default" height="small">
                Select
              </Button>
              <Button
                color="orange"
                width="default"
                height="small"
                onClick={() => setEditMode(true)}
              >
                Edit
              </Button>
            </Column>
          </ArmyRow>
          {editMode && (
            <Toolbar>
              <ToolbarSpacer />
              <Button color="red" width="default" height="default">
                🗑️
              </Button>
              <Button
                color="red"
                width="large"
                height="default"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </Button>
              <Button
                color="limegreen"
                width="large"
                height="default"
                onClick={() => setEditMode(false)}
              >
                ⬇ Save
              </Button>
            </Toolbar>
          )}
          {editMode && (
            <Inset>
              <ArmyTray>
                <Group rows={2}>
                  <UnitButton
                    portraitColor={colorMap["barbarian"]}
                    label="Barbarian"
                    level={2}
                  />
                  <UnitButton
                    portraitColor={colorMap["archer"]}
                    label="Archer"
                  />
                  <Placeholder />
                  <Placeholder />
                </Group>
              </ArmyTray>
            </Inset>
          )}
        </div>
      </Dialog>
    </>
  );
};
