import { Inset } from "../atoms/Inset";
import { Text } from "../atoms/Text";

export const MiniStat: React.FC<{ label: string; stat: string }> = ({
  label,
  stat,
}) => (
  <Text size="small">
    {label} <Inset inline>{stat}</Inset>
  </Text>
);
