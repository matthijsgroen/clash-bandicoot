import { PropsWithChildren } from "react";
import styles from "./Dialog.module.css";
import { Button } from "./Button";
import { DialogTitle } from "./DialogTitle";

export const Dialog: React.FC<
  PropsWithChildren<{ title: React.ReactNode; onClose?: VoidFunction }>
> = ({ title, children, onClose }) => {
  return (
    <div className={styles.dimmer}>
      <div role="dialog" className={styles.dialog}>
        <header className={styles.dialogHeader}>
          {typeof title === "string" ? (
            <DialogTitle>{title}</DialogTitle>
          ) : (
            title
          )}
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
