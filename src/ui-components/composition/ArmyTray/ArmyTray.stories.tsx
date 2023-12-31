import type { Meta, StoryObj } from "@storybook/react";

import { ArmyTray as ArmyTrayComponent } from "./ArmyTray";
import { Group } from "./Group";
import { UnitButton } from "./UnitButton";

const meta = {
  title: "Compositions/ArmyTray",
  component: ArmyTrayComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof ArmyTrayComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const ArmyTray: Story = {
  args: {
    children: [
      <Group>
        <UnitButton portraitColor="pink" label="Archer" amount={3} />
      </Group>,
    ],
    darkOverlay: true,
  },
};
