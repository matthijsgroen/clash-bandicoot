import { PropsWithChildren } from "react";
import styles from "./Inset.module.css";

export const Inset: React.FC<PropsWithChildren> = ({ children }) => (
  <div className={styles.inset}>{children}</div>
);
