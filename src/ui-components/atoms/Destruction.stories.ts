import type { Meta, StoryObj } from "@storybook/react";

import { Destruction as DestructionComponent } from "./Destruction";

const meta = {
  title: "Atoms/Destruction",
  component: DestructionComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof DestructionComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Destruction: Story = {
  args: {
    damage: 0.4,
    stars: 1,
  },
};
