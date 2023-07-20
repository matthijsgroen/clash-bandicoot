import type { Meta, StoryObj } from "@storybook/react";

import { CloudCurtain as CloudCurtainComponent } from "./CloudCurtain";

const meta = {
  title: "Atoms/CloudCurtain",
  component: CloudCurtainComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof CloudCurtainComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const CloudCurtain: Story = {
  args: {
    open: true,
  },
};
