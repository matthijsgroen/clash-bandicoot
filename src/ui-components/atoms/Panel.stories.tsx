import type { Meta, StoryObj } from "@storybook/react";

import { Panel as PanelComponent } from "./Panel";
import { Text } from "./Text";

const meta = {
  title: "Atoms/Panel",
  component: PanelComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof PanelComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Panel: Story = {
  args: {
    children: <Text>Lorem Ipsum dolor sid amed.</Text>,
  },
};
