import { CSSProperties, PropsWithChildren } from "react";
import styles from "./Tab.module.css";
import classNames from "classnames";
import { Text } from "./Text";

type PanelProperties = { "--color": string } & CSSProperties;

export const Tab: React.FC<
  PropsWithChildren<{
    active?: boolean;
    disabled?: boolean;
    color?: string;
    onClick?: VoidFunction;
  }>
> = ({
  children,
  active = false,
  disabled = false,
  color = "lightgrey",
  onClick,
}) => {
  return (
    <button
      className={classNames(styles.tab, {
        [styles.inactive]: !active,
        [styles.disabled]: disabled,
      })}
      role="tab"
      style={{ "--color": color } as PanelProperties}
      onClick={onClick}
    >
      {typeof children === "string" ? (
        <Text color={disabled ? "#aaa" : undefined}>{children}</Text>
      ) : (
        children
      )}
    </button>
  );
};
