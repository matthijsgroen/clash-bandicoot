import classNames from "classnames";
import styles from "./ArmyTray.module.css";
import { PropsWithChildren } from "react";

export const ArmyTray: React.FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return (
    <aside className={classNames(styles.armyTray, className)}>
      <div className={styles.scrollArea}>{children}</div>
    </aside>
  );
};
