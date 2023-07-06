import { CSSProperties, MouseEventHandler } from "react";
import styles from "./UnitButton.module.css";
import classNames from "classnames";

interface ButtonCSSProperties extends CSSProperties {
  "--base-color": string;
}

const DEFAULT_COLOR = "#88c";

export const UnitButton: React.FC<{
  portraitColor: string;
  buttonColor?: string;
  label?: string;
  amount?: number;
  selected?: boolean;
  disabled?: boolean;
  level?: number;
  onClick?: MouseEventHandler;
}> = ({
  portraitColor,
  buttonColor = DEFAULT_COLOR,
  label,
  level,
  amount,
  selected,
  disabled,
  onClick,
}) => (
  <button
    className={classNames(styles.unit, {
      [styles.selected]: selected,
    })}
    style={{ "--base-color": buttonColor } as ButtonCSSProperties}
    disabled={disabled}
    onClick={onClick}
  >
    <div className={styles.amounts}>{amount !== undefined && `x${amount}`}</div>
    <div className={styles.portraitBox}>
      <div
        style={{ backgroundColor: portraitColor }}
        className={styles.portrait}
      >
        {label}
        {level !== undefined && <div className={styles.level}>{level}</div>}
      </div>
    </div>
  </button>
);
