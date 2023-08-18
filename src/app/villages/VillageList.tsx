import { Village } from "../../api/bases";
import { getArmySize, getTownhallLevel } from "../../engine/layout/baseLayout";
import { Button } from "../../ui-components/atoms/Button";
import { Inset } from "../../ui-components/atoms/Inset";
import { Text } from "../../ui-components/atoms/Text";
import { ButtonWithConfirm } from "../../ui-components/composition/ButtonWithConfirm";
import { Column } from "../components/Column";
import { Row } from "../components/Row";

export const VillageList: React.FC<{
  villages: Village[];
  onCopy?: (village: Village) => void;
  onSelect?: (village: Village) => void;
  onDelete?: (village: Village) => void;
}> = ({ villages, onCopy, onSelect, onDelete }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        padding: "0.5rem",
      }}
    >
      {villages.map((village) => (
        <Row key={village.id}>
          <Inset>
            <Text>{village.name}</Text>
            <Text size="small" color="#333" skipOutline>
              TH: {getTownhallLevel(village.layout)} Army size:{" "}
              {getArmySize(village.layout)}
            </Text>
          </Inset>
          {village.builtIn && (
            <Column>
              <Button
                color="orange"
                width="default"
                height="small"
                onClick={() => {
                  onSelect?.(village);
                }}
              >
                View
              </Button>
              <Button
                color="cornflowerblue"
                width="default"
                height="small"
                onClick={() => {
                  onCopy?.(village);
                }}
              >
                Copy
              </Button>
            </Column>
          )}
          {!village.builtIn && (
            <Column>
              <Button
                color="orange"
                width="default"
                height="small"
                onClick={() => {
                  onSelect?.(village);
                }}
              >
                Edit
              </Button>
              <ButtonWithConfirm
                color="red"
                width="default"
                height="small"
                onClick={() => {
                  onDelete?.(village);
                }}
                confirmTitle="Delete village?"
                confirmMessage="This cannot be undone! The village will be removed forever."
              >
                Delete
              </ButtonWithConfirm>
            </Column>
          )}
        </Row>
      ))}
    </div>
  );
};
