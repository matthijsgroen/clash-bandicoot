import { CSSProperties, PropsWithChildren, useEffect, useState } from "react";
import styles from "./Dialog.module.css";
import { Button } from "./Button";
import { DialogTitle } from "./DialogTitle";
import classnames from "classnames";
import { Panel } from "./Panel";

export const Dialog: React.FC<
  PropsWithChildren<{
    title?: React.ReactNode;
    closing?: boolean;
    onClose?: VoidFunction;
    showHeader?: boolean;
    width?: CSSProperties["width"];
    height?: CSSProperties["height"];
  }>
> = ({
  title,
  children,
  showHeader = true,
  closing = false,
  onClose,
  width,
  height,
}) => {
  const sizeProps: CSSProperties = {};
  if (width) {
    sizeProps.width = width;
  }
  if (height) {
    sizeProps.height = height;
  }

  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if ((isClosing || closing) && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, 210);
      return () => {
        console.log("clearing timeout");
        clearTimeout(timer);
      };
    }
  }, [isClosing, closing, showHeader, onClose]);

  return (
    <div
      className={classnames(styles.dimmer, {
        [styles.close]: isClosing || closing,
      })}
    >
      <div role="dialog" className={styles.dialog} style={sizeProps}>
        {(title !== undefined || onClose) && showHeader && (
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
        )}
        <Panel scrollable>{children}</Panel>
      </div>
    </div>
  );
};
