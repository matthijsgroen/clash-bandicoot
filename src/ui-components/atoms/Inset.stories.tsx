import type { Meta, StoryObj } from "@storybook/react";

import { Inset as InsetComponent } from "./Inset";
import { Text } from "./Text";

const meta = {
  title: "Atoms/Inset",
  component: InsetComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof InsetComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Inset: Story = {
  args: {
    children: <Text>Lorem Ipsum dolor sid amed.</Text>,
  },
};
