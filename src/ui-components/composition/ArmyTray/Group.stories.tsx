import type { Meta, StoryObj } from "@storybook/react";

import { Group as GroupComponent } from "./Group";
import { ArmyTray } from "./ArmyTray";
import { UnitButton } from "./UnitButton";
import { Placeholder } from "./Placeholder";

const meta = {
  title: "Compositions/ArmyTray",
  component: GroupComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof GroupComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Group: Story = {
  args: {
    children: [
      <UnitButton portraitColor="pink" />,
      <UnitButton portraitColor="#bb0" />,
      <UnitButton portraitColor="red" />,
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ height: "5rem" }}>
        <ArmyTray>
          <Story />
          <GroupComponent>
            <Placeholder />
            <Placeholder />
            <Placeholder />
          </GroupComponent>
        </ArmyTray>
      </div>
    ),
  ],
};