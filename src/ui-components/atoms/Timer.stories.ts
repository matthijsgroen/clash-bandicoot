import type { Meta, StoryObj } from "@storybook/react";

import { Timer as TimerComponent } from "./Timer";

const meta = {
  title: "Atoms/Timer",
  component: TimerComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof TimerComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Timer: Story = {
  args: {
    label: "Time till end:",
    timeLeft: 90_000,
  },
};
