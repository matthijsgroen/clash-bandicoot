import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { Toolbar as ToolbarComponent, ToolbarSpacer } from "./Toolbar";

const meta = {
  title: "Atoms/Toolbar",
  component: ToolbarComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof ToolbarComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Toolbar: Story = {
  args: {
    children: [
      <Button color="orange" width="large" height="default">
        + New
      </Button>,
      <ToolbarSpacer />,
      <Button color="orange" width="large" height="default">
        Edit
      </Button>,
      <Button color="red" width="large" height="default">
        Delete
      </Button>,
    ],
  },
};
