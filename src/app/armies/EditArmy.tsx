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

export const EditArmy: React.FC<{ onClose?: VoidFunction }> = ({ onClose }) => (
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
