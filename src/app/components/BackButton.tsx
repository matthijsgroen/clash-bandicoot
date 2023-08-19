import { ComponentProps } from "react";
import { Button } from "../../ui-components/atoms/Button";

export const BackButton: React.FC<
  Omit<
    ComponentProps<typeof Button>,
    "color" | "children" | "width" | "icon" | "height"
  >
> = (props) => (
  <Button color="limegreen" icon width="default" height="small" {...props}>
    ⬅&#65038;
  </Button>
);
