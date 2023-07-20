import { CSSProperties, PropsWithChildren, useEffect, useState } from "react";
import styles from "./Dialog.module.css";
import { Button } from "./Button";
import { DialogTitle } from "./DialogTitle";
import classnames from "classnames";

export const Dialog: React.FC<
  PropsWithChildren<{
    title: React.ReactNode;
    onClose?: VoidFunction;
    width?: CSSProperties["width"];
    height?: CSSProperties["height"];
  }>
> = ({ title, children, onClose, width, height }) => {
  const sizeProps: CSSProperties = {};
  if (width) {
    sizeProps.width = width;
  }
  if (height) {
    sizeProps.height = height;
  }

  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isClosing && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, 150);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isClosing, onClose]);

  return (
    <div className={classnames(styles.dimmer, { [styles.close]: isClosing })}>
      <div role="dialog" className={styles.dialog} style={sizeProps}>
        <header className={styles.dialogHeader}>
          {typeof title === "string" ? (
            <DialogTitle>{title}</DialogTitle>
          ) : (
            title
          )}
          <Button
            color="red"
            onClick={() => {
              if (onClose) {
                setIsClosing(true);
              }
            }}
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
