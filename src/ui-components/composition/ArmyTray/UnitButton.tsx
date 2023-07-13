import { CSSProperties } from "react";
import styles from "./UnitButton.module.css";
import classNames from "classnames";

interface ButtonCSSProperties extends CSSProperties {
  "--base-color": string;
}

export const DEFAULT_COLOR = "#88c";

export const UnitButton: React.FC<
  {
    portraitColor: string;
    buttonColor?: string;
    label?: string;
    amount?: number;
    selected?: boolean;
    disabled?: boolean;
    level?: number;
    hidden?: boolean;
  } & Omit<
    React.DOMAttributes<HTMLButtonElement>,
    "dangerouslySetInnerHTML" | "children"
  >
> = ({
  portraitColor,
  buttonColor = DEFAULT_COLOR,
  label,
  level,
  amount,
  selected,
  disabled,
  hidden,
  ...events
}) => (
  <button
    className={classNames(styles.unit, {
      [styles.selected]: selected,
      [styles.hidden]: hidden,
    })}
    style={{ "--base-color": buttonColor } as ButtonCSSProperties}
    disabled={disabled}
    {...events}
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
