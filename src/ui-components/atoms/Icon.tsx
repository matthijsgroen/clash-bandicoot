import { PropsWithChildren } from "react";
import styles from "./Icon.module.css";

export const Icon: React.FC<PropsWithChildren> = ({ children }) => (
  <span role="img" className={styles.icon}>
    {children}
  </span>
);
