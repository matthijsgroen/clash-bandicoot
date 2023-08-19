import { Text } from "../atoms/Text";
import { Toolbar, ToolbarSpacer } from "../atoms/Toolbar";

export const UnitStat: React.FC<{ label: string; stat: string }> = ({
  label,
  stat,
}) => (
  <Toolbar
    style={{ borderBottom: "1px solid darkslateblue", margin: "0.5rem 0" }}
  >
    <Text size="default" color="darkslateblue" skipOutline>
      {label}
    </Text>
    <ToolbarSpacer />
    <Text size="default" color="#444" skipOutline>
      {stat}
    </Text>
  </Toolbar>
);
