import classNames from "classnames";
import styles from "./ArmyTray.module.css";
import { PropsWithChildren } from "react";

export const ArmyTray: React.FC<
  PropsWithChildren<{ className?: string; darkOverlay?: boolean }>
> = ({ children, className, darkOverlay = false }) => {
  return (
    <aside
      className={classNames(
        styles.armyTray,
        { [styles.darkOverlay]: darkOverlay },
        className
      )}
    >
      <div className={styles.scrollArea}>{children}</div>
    </aside>
  );
};
