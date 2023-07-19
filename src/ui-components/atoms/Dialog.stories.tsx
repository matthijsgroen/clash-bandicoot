import type { Meta, StoryObj } from "@storybook/react";

import { Dialog as DialogComponent } from "./Dialog";

const meta = {
  title: "Atoms/Dialog",
  component: DialogComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof DialogComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Dialog: Story = {
  args: {
    title: "Hello",
    children: <p>Lorem ipsum dolor sit amed.</p>,
  },
};
