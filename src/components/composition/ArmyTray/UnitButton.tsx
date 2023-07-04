import { MouseEventHandler } from "react";
import styles from "./UnitButton.module.css";
import classNames from "classnames";

export const UnitButton: React.FC<{
  color: string;
  label?: string;
  amount?: number;
  selected?: boolean;
  disabled?: boolean;
  level?: number;
  onClick?: MouseEventHandler;
}> = ({ color, label, level, amount, selected, disabled, onClick }) => (
  <button
    className={classNames(styles.unit, {
      [styles.selected]: selected,
    })}
    disabled={disabled}
    onClick={onClick}
  >
    <div className={styles.amounts}>{amount !== undefined && `x${amount}`}</div>
    <div className={styles.portraitBox}>
      <div style={{ backgroundColor: color }} className={styles.portrait}>
        {label}
        {level !== undefined && <div className={styles.level}>{level}</div>}
      </div>
    </div>
  </button>
);
