import type { Meta, StoryObj } from "@storybook/react";

import { Group } from "./Group";
import { ArmyTray } from "./ArmyTray";
import { DEFAULT_COLOR, UnitButton as UnitButtonComponent } from "./UnitButton";
import { Placeholder } from "./Placeholder";

const meta = {
  title: "Compositions/ArmyTray",
  component: UnitButtonComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof UnitButtonComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const UnitButton: Story = {
  args: {
    portraitColor: "pink",
    label: "Archer",
    buttonColor: DEFAULT_COLOR,
    level: undefined,
  },
  decorators: [
    (Story) => (
      <div style={{ height: "5rem" }}>
        <ArmyTray>
          <Group>
            <Story />
          </Group>
          <Group>
            <Placeholder />
            <Placeholder />
            <Placeholder />
          </Group>
        </ArmyTray>
      </div>
    ),
  ],
};
