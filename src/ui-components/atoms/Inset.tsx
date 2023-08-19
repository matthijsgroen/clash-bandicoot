import { PropsWithChildren } from "react";
import styles from "./Inset.module.css";
import classNames from "classnames";

export const Inset: React.FC<PropsWithChildren<{ inline?: boolean }>> = ({
  children,
  inline = false,
}) =>
  inline ? (
    <span className={classNames(styles.inset, styles.inline)}>{children}</span>
  ) : (
    <div className={styles.inset}>{children}</div>
  );
