import styles from "./Group.module.css";
import { CSSProperties, PropsWithChildren } from "react";

type GroupRowProperties = { "--rows": number } & CSSProperties;

export const Group: React.FC<PropsWithChildren<{ rows?: number }>> = ({
  children,
  rows = 1,
}) => (
  <div
    className={styles.group}
    style={{ "--rows": rows } as GroupRowProperties}
  >
    {children}
  </div>
);
