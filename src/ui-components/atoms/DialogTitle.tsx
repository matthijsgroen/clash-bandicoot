import { PropsWithChildren } from "react";
import { Text } from "./Text";
import styles from "./DialogTitle.module.css";

export const DialogTitle: React.FC<PropsWithChildren> = ({ children }) => (
  <Text element="h1" className={styles.dialogTitle}>
    {children}
  </Text>
);
