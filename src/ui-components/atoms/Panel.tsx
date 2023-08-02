import classNames from "classnames";
import { CSSProperties, PropsWithChildren } from "react";
import styles from "./Panel.module.css";

type PanelProperties = { "--color": string } & CSSProperties;

export const Panel: React.FC<
  PropsWithChildren<{
    scrollable?: boolean;
    className?: string;
    color?: string;
  }>
> = ({ children, scrollable, className, color = "lightgrey" }) => (
  <div
    style={{ "--color": color } as PanelProperties}
    className={classNames(
      { [styles.scrollable]: scrollable },
      styles.panel,
      className
    )}
  >
    {children}
  </div>
);
