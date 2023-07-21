import type { Meta, StoryObj } from "@storybook/react";

import { Grid } from "./Grid";
import { Building as BuildingComponent } from "./Building";
import { Text } from "../../atoms/Text";

const meta = {
  title: "Compositions/Village/Building",
  component: BuildingComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof BuildingComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

const decorators: Story["decorators"] = [
  (Story) => (
    <Grid width={16} height={16}>
      <Story />
    </Grid>
  ),
];

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Building: Story = {
  args: {
    x: 5,
    y: 5,
    size: 2,
    buildingType: "name",
    level: 1,
    hitPoints: 30,
  },
  decorators,
};

export const BuildingWithFloat: Story = {
  args: {
    x: 5,
    y: 5,
    size: 2,
    buildingType: "name",
    level: 1,
    hitPoints: 40,
    floatingContent: [
      <Text centered>My building</Text>,
      <Text size="small" centered>
        Level 1
      </Text>,
    ],
  },
  decorators,
};

export const DestroyedBuilding: Story = {
  args: {
    x: 5,
    y: 5,
    size: 2,
    buildingType: "name",
    level: 1,
    hitPoints: 0,
  },
  decorators,
};
