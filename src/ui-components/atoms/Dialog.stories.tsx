import type { Meta, StoryObj } from "@storybook/react";

import { Dialog as DialogComponent } from "./Dialog";
import { Text } from "./Text";
import { Toolbar, ToolbarSpacer } from "./Toolbar";
import { Button } from "./Button";

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
    children: [
      <Text skipOutline color="#222">
        Lorem ipsum dolor sid amed.
      </Text>,
    ],
  },
};

export const DialogWithoutTitle: Story = {
  args: {
    onClose: undefined,
    children: [
      <Text element="h1" size="large">
        Lorem ipsum dolor sid amed.
      </Text>,
      <Text skipOutline color="#222">
        Lorem ipsum dolor sid amed.
      </Text>,
      <Toolbar>
        <ToolbarSpacer />
        <Button color={"red"} height="default" width="large">
          Cancel
        </Button>
        <Button color={"limegreen"} height="default" width="large">
          Yes
        </Button>
        <ToolbarSpacer />
      </Toolbar>,
    ],
  },
};
