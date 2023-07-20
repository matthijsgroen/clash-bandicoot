import { PropsWithChildren } from "react";
import styles from "./DialogTitle.module.css";

export const DialogTitle: React.FC<PropsWithChildren> = ({ children }) => (
  <h1 className={styles.dialogTitle}>{children}</h1>
);
