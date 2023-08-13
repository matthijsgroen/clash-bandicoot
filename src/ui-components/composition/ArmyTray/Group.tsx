import styles from "./Group.module.css";
import { CSSProperties, PropsWithChildren } from "react";

type GroupRowProperties = {
  "--rows": number;
  "--width": string;
} & CSSProperties;

export const Group: React.FC<
  PropsWithChildren<{ rows?: number; width?: "default" | "large" }>
> = ({ children, rows = 1, width = "default" }) => (
  <div
    className={styles.group}
    style={
      {
        "--rows": rows,
        "--width": `var(--control-size-${width})`,
      } as GroupRowProperties
    }
  >
    {children}
  </div>
);
