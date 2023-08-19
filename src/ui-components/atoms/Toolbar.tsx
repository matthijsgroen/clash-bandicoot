import { CSSProperties, PropsWithChildren } from "react";
import styles from "./Toolbar.module.css";
import classNames from "classnames";

export const Toolbar: React.FC<
  PropsWithChildren<{ className?: string; style?: CSSProperties }>
> = ({ children, className, style }) => (
  <div
    role="toolbar"
    className={classNames(styles.toolbar, className)}
    style={style}
  >
    {children}
  </div>
);

export const ToolbarSpacer: React.FC = () => (
  <div role="separator" className={styles.spacer}></div>
);
