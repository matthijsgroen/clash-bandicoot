import { CSSProperties, PropsWithChildren } from "react";
import styles from "./Badge.module.css";

type BadgeCSS = { "--badge-color": CSSProperties["color"] } & CSSProperties;

type Props = {
  color?: CSSProperties["color"];
  content: string;
  hidden?: boolean;
};

export const Badge: React.FC<PropsWithChildren<Props>> = ({
  children,
  hidden = false,
  content,
  color = "red",
}) => (
  <span className={styles.badgeContainer}>
    {children}
    {!hidden && (
      <span
        className={styles.badge}
        style={{ "--badge-color": color } as BadgeCSS}
      >
        {content}
      </span>
    )}
  </span>
);
