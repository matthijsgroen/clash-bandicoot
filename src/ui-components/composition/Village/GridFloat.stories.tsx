import type { Meta, StoryObj } from "@storybook/react";
import { Grid } from "./Grid";
import { GridFloat as GridFloatComponent } from "./GridFloat";
import { Building } from "./Building";
import { Text } from "../../atoms/Text";
import { HealthBar } from "../../atoms/HealthBar";

const meta = {
  title: "Compositions/Village/GridFloat",
  component: GridFloatComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof GridFloatComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

const decorators: Story["decorators"] = [
  (Story, context) => (
    <Grid width={16} height={16}>
      <Story />
      <Building
        x={context.args.x}
        y={context.args.y}
        size={2}
        level={3}
        buildingType={"Townhall"}
        hitPoints={450}
      />
    </Grid>
  ),
];

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const BuildingName: Story = {
  args: {
    x: 5,
    y: 5,
    children: [
      <Text size="default" key="label">
        Townhall
      </Text>,
      <Text size="small" key="level" centered>
        Level 3
      </Text>,
    ],
  },
  decorators,
};

export const BuildingHealthBar: Story = {
  args: {
    x: 5,
    y: 5,
    children: [<HealthBar baseColor="royalblue" progress={0.7} />],
  },
  decorators,
};
