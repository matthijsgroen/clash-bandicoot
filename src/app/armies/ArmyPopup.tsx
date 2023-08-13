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
import { DEFAULT_COLOR } from "../../ui-components/composition/ArmyTray/UnitButton";
import { Icon } from "../../ui-components/atoms/Icon";

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

export const ArmyList: React.FC<{ onSelect?: VoidFunction }> = ({
  onSelect,
}) => (
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
            // createMutation.mutate({ name: "New Village" });
          }}
        >
          + New
        </Button>
      </Toolbar>
    </Panel>
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
          onClick={() => onSelect?.()}
        >
          Edit
        </Button>
      </Column>
    </ArmyRow>
  </div>
);

const EditArmy: React.FC<{ onClose?: VoidFunction }> = ({ onClose }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    }}
  >
    <Toolbar>
      <Text size="small">GoWiPe</Text>
      <ToolbarSpacer />
      <Text size="small">2 / 220</Text>
    </Toolbar>
    <Inset>
      <ArmyTray>
        <Group>
          <UnitButton
            portraitColor={colorMap["barbarian"]}
            label="Barbarian"
            amount={1}
            level={2}
          >
            <Button color={"red"} icon width="mini" height="mini">
              -
            </Button>
          </UnitButton>
          <UnitButton
            portraitColor={colorMap["archer"]}
            label="Archer"
            amount={1}
          >
            <Button color={"red"} icon width="mini" height="mini">
              -
            </Button>
          </UnitButton>
          <Placeholder />
          <Placeholder />
          <Placeholder />
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </Group>
      </ArmyTray>
    </Inset>
    <Toolbar>
      <ToolbarSpacer />
      <Button color="red" width="default" height="default">
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
          <UnitButton
            portraitColor={colorMap["barbarian"]}
            label="Barbarian"
            level={2}
            size={1}
          >
            <Button color={DEFAULT_COLOR} icon width="mini" height="mini">
              i
            </Button>
          </UnitButton>
          <UnitButton
            portraitColor={colorMap["archer"]}
            label="Archer"
            size={1}
          >
            <Button color={DEFAULT_COLOR} icon width="mini" height="mini">
              i
            </Button>
          </UnitButton>
          <Placeholder />
          <Placeholder />
        </Group>
      </ArmyTray>
    </Inset>
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
        height="min(90vh, 22.5rem)"
      >
        {!editMode && <ArmyList onSelect={() => setEditMode(true)} />}
        {editMode && <EditArmy />}
      </Dialog>
    </>
  );
};
