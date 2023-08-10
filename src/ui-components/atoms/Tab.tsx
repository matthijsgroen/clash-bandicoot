import { CSSProperties, PropsWithChildren } from "react";
import styles from "./Tab.module.css";
import classNames from "classnames";
import { Text } from "./Text";

type PanelProperties = { "--color": string } & CSSProperties;

export const Tab: React.FC<
  PropsWithChildren<{
    active?: boolean;
    color?: string;
    onClick?: VoidFunction;
  }>
> = ({ children, active = false, color = "lightgrey", onClick }) => {
  return (
    <button
      className={classNames(styles.tab, { [styles.inactive]: !active })}
      role="tab"
      style={{ "--color": color } as PanelProperties}
      onClick={onClick}
    >
      {typeof children === "string" ? <Text>{children}</Text> : children}
    </button>
  );
};
