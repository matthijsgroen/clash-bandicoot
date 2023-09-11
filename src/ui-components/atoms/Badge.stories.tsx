import type { Meta, StoryObj } from "@storybook/react";

import { Badge as BadgeComponent } from "./Badge";
import { Button as ButtonArgs } from "./Button.stories";
import { Button } from "./Button";

const meta: Meta<typeof BadgeComponent> = {
  title: "Atoms/Badge",
  component: BadgeComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof BadgeComponent>;

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Badge: Story = {
  args: {
    color: "orange",
    content: "2",
    children: [<Button {...ButtonArgs.args} color="limegreen" />],
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
};
