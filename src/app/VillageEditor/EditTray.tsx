import classNames from "classnames";
import styles from "./EditTray.module.css";
import { useState } from "react";
import { Button } from "../../ui-components/atoms/Button";

export const EditTray: React.FC<{
  scoutView?: boolean;
  readOnly?: boolean;
  onClose?: VoidFunction;
  onSave?: VoidFunction;
  onMaximize?: VoidFunction;
  onScoutViewChange?: (view: boolean) => void;
}> = ({
  onClose,
  onSave,
  onScoutViewChange,
  onMaximize,
  scoutView = false,
  readOnly = false,
}) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  return (
    <div className={styles.tray}>
      <div
        className={classNames(styles.trayPanel, {
          [styles.trayOpen]: isPanelOpen,
        })}
      >
        <Button
          onClick={() => {
            setIsPanelOpen((state) => !state);
          }}
          color="lightgrey"
          width="small"
          height="default"
        >
          🔧
        </Button>
        <div className={styles.panel}>
          <Button
            color="#7cb342"
            height="small"
            width="huge"
            disabled={readOnly}
            onClick={onMaximize}
          >
            Max all buildings
          </Button>
          <Button
            color="#7cb342"
            height="small"
            width="huge"
            pressed={scoutView}
            onClick={() => {
              onScoutViewChange?.(!scoutView);
            }}
          >
            Scout view
          </Button>
          <hr />
          <Button
            color="#7cb342"
            height="small"
            width="huge"
            onClick={onSave}
            disabled={readOnly}
          >
            Save
          </Button>
          <Button color="red" height="small" width="huge" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
      <Button
        color="lightgrey"
        width="small"
        height="default"
        className={styles.insetButton}
        onClick={() => {
          setIsPanelOpen((state) => !state);
        }}
      >
        🔧
      </Button>
    </div>
  );
};
