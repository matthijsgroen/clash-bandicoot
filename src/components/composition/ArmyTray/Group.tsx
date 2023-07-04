import styles from "./Group.module.css";
import { PropsWithChildren } from "react";

export const Group: React.FC<PropsWithChildren> = ({ children }) => (
  <div className={styles.group}>{children}</div>
);
