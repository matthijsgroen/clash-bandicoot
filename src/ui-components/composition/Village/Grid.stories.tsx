import type { Meta, StoryObj } from "@storybook/react";

import { Grid as GridComponent } from "./Grid";

const meta = {
  title: "Compositions/Village",
  component: GridComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof GridComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Grid: Story = {
  args: {
    width: 11,
    height: 11,
  },
};
