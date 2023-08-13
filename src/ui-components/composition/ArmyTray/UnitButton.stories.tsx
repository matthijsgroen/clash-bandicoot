import type { Meta, StoryObj } from "@storybook/react";

import { Group } from "./Group";
import { ArmyTray } from "./ArmyTray";
import { DEFAULT_COLOR, UnitButton as UnitButtonComponent } from "./UnitButton";
import { Placeholder } from "./Placeholder";
import { Inset } from "../../atoms/Inset";
import { Button } from "../../atoms/Button";

const meta = {
  title: "Compositions/ArmyTray/UnitButton",
  component: UnitButtonComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof UnitButtonComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

const decorators: Story["decorators"] = [
  (Story) => (
    <ArmyTray darkOverlay>
      <Group>
        <Story />
      </Group>
      <Group>
        <Placeholder />
        <Placeholder />
        <Placeholder />
      </Group>
    </ArmyTray>
  ),
];
const insetDecorators: Story["decorators"] = [
  (Story) => (
    <Inset>
      <ArmyTray>
        <Group>
          <Story />
        </Group>
      </ArmyTray>
    </Inset>
  ),
];

export const UnitButton: Story = {
  args: {
    portraitColor: "pink",
    label: "Archer",
    buttonColor: DEFAULT_COLOR,
    level: undefined,
  },
  decorators,
};

export const UnitButtonWithLevel: Story = {
  args: {
    portraitColor: "pink",
    label: "Archer",
    buttonColor: DEFAULT_COLOR,
    level: 1,
  },
  decorators,
};

export const UnitButtonInset: Story = {
  args: {
    portraitColor: "pink",
    label: "Archer",
    buttonColor: DEFAULT_COLOR,
    level: 1,
  },
  decorators: insetDecorators,
};

export const UnitButtonWithAmount: Story = {
  args: {
    portraitColor: "pink",
    label: "Archer",
    amount: 12,
    buttonColor: DEFAULT_COLOR,
  },
  decorators,
};

export const BuildingButton: Story = {
  args: {
    buttonColor: "#bbf",
    portraitColor: "#bbf",
    label: "Townhall",
    amount: 1,
  },
  decorators,
};

export const UnitButtonWithDelete: Story = {
  args: {
    portraitColor: "pink",
    label: "Archer",
    amount: 12,
    level: 2,
    buttonColor: DEFAULT_COLOR,
    children: [
      <Button color="red" icon width="mini" height="mini">
        -
      </Button>,
    ],
  },
  decorators,
};

export const UnitButtonWithInfo: Story = {
  args: {
    portraitColor: "pink",
    label: "Archer",
    amount: 12,
    level: 2,
    buttonColor: DEFAULT_COLOR,
    children: [
      <Button color={DEFAULT_COLOR} icon width="mini" height="mini">
        i
      </Button>,
    ],
  },
  decorators,
};
