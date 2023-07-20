import { PropsWithChildren } from "react";
import styles from "./Toolbar.module.css";

export const Toolbar: React.FC<PropsWithChildren> = ({ children }) => (
  <div role="toolbar" className={styles.toolbar}>
    {children}
  </div>
);

export const ToolbarSpacer: React.FC = () => (
  <div role="separator" className={styles.spacer}></div>
);
