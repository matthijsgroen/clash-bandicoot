import type { Meta, StoryObj } from "@storybook/react";

import { Text as TextComponent } from "./Text";

const meta = {
  title: "Atoms/Text",
  component: TextComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof TextComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Text: Story = {
  args: {
    children: "Lorem ipsum dolor sit amed.",
  },
};

export const TextWithColor: Story = {
  args: {
    children: "Lorem ipsum dolor sit amed.",
    color: "cornflowerblue",
  },
};
