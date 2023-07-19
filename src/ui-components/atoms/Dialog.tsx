import { PropsWithChildren } from "react";
import styles from "./Dialog.module.css";
import { Button } from "./Button";

export const Dialog: React.FC<
  PropsWithChildren<{ title: React.ReactNode; onClose: () => void }>
> = ({ title, children, onClose }) => {
  return (
    <div className={styles.dimmer}>
      <div role="dialog" className={styles.dialog}>
        <header className={styles.dialogHeader}>
          {title}
          <Button
            color="red"
            onClick={onClose}
            width="small"
            height="small"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </Button>
        </header>
        <main className={styles.dialogBody}>{children}</main>
      </div>
    </div>
  );
};
