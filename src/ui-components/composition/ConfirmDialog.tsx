import { useState } from "react";
import { Button } from "../atoms/Button";
import { Dialog } from "../atoms/Dialog";
import { Text } from "../atoms/Text";
import { Toolbar, ToolbarSpacer } from "../atoms/Toolbar";

export const ConfirmDialog: React.FC<{
  title: string;
  message: string;
  onClose: (confirmed: boolean) => void;
}> = ({ title, message, onClose }) => {
  const [choice, updateChoice] = useState<"confirmed" | "canceled" | null>(
    null
  );

  const onCancelClick = () => {
    updateChoice("canceled");
  };

  const onConfirmClick = () => {
    updateChoice("confirmed");
  };

  return (
    <Dialog
      closing={choice !== null}
      showHeader={false}
      width={"calc(40ch + 1rem)"}
      onClose={() => {
        onClose(choice === "confirmed");
      }}
    >
      <Text element="h1" size="large" centered>
        {title}
      </Text>
      <div style={{ padding: "0 1rem 1rem" }}>
        <Text skipOutline color="#222" marginBottom marginTop>
          {message}
        </Text>
      </div>
      <Toolbar>
        <ToolbarSpacer />
        <Button
          color={"red"}
          height="default"
          width="large"
          onClick={onCancelClick}
        >
          Cancel
        </Button>
        <Button
          color={"limegreen"}
          height="default"
          width="large"
          onClick={onConfirmClick}
        >
          Okay
        </Button>
        <ToolbarSpacer />
      </Toolbar>
    </Dialog>
  );
};
