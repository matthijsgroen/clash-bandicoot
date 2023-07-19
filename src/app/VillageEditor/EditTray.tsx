import classNames from "classnames";
import styles from "./EditTray.module.css";
import { useState } from "react";
import { Button } from "../../ui-components/atoms/Button";

export const EditTray: React.FC<{
  onClose?: () => void;
  onSave?: () => void;
}> = ({ onClose, onSave }) => {
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
          <Button color="#7cb342" height="small" width="huge">
            Max all buildings
          </Button>
          <Button color="#7cb342" height="small" width="huge">
            Scout view
          </Button>
          <hr />
          <Button color="#7cb342" height="small" width="huge" onClick={onSave}>
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
