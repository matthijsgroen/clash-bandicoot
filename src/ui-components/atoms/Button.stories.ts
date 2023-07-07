import type { Meta, StoryObj } from "@storybook/react";

import { Button as ButtonComponent } from "./Button";

const meta = {
  title: "Atoms/Button",
  component: ButtonComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof ButtonComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Button: Story = {
  args: {
    color: "orange",
    children: "Hello",
  },
};
