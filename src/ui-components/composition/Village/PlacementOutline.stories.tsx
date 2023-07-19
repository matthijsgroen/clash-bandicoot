import type { Meta, StoryObj } from "@storybook/react";

import { Grid } from "./Grid";
import { PlacementOutline as PlacementOutlineComponent } from "./PlacementOutline";
import { layoutBuilder } from "../../../engine/layout/baseLayout";
import { Buildings } from "./Buildings";

const meta = {
  title: "Compositions/Village",
  component: PlacementOutlineComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof PlacementOutlineComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const PlacementOutline: Story = {
  args: {
    layout: layoutBuilder()
      .placeBuilding("townhall", 2, [20, 20])
      .placeBuilding("armycamp", 2, [25, 21])
      .placeBuilding("bomb", 1, [12, 12])
      .result(),
  },
  decorators: [
    (Story, context) => (
      <Grid
        width={context.args.layout.gridSize[0]}
        height={context.args.layout.gridSize[1]}
      >
        <Story />
        <Buildings layout={context.args.layout} showHidden />
      </Grid>
    ),
  ],
};
