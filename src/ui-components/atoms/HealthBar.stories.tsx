import type { Meta, StoryObj } from "@storybook/react";

import { HealthBar as HealthBarComponent } from "./HealthBar";

const meta = {
  title: "Atoms/HealthBar",
  component: HealthBarComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof HealthBarComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const BuildingHealthBar: Story = {
  args: {
    baseColor: "royalblue",
    progress: 1,
  },
};

export const UnitHealthBar: Story = {
  args: {
    baseColor: "limegreen",
    progress: 1,
  },
};

export const UnitHealthBarDamage: Story = {
  args: {
    baseColor: "limegreen",
    progress: 0.2,
  },
};
