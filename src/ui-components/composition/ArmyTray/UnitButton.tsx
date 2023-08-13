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
    size?: number;
    selected?: boolean;
    disabled?: boolean;
    level?: number;
    hidden?: boolean;
    jump?: boolean;
  } & Omit<React.DOMAttributes<HTMLButtonElement>, "dangerouslySetInnerHTML">
> = ({
  portraitColor,
  buttonColor = DEFAULT_COLOR,
  label,
  level,
  size,
  amount,
  selected,
  disabled,
  hidden,
  jump,
  children,
  ...events
}) => (
  <button
    className={classNames(styles.unit, {
      [styles.selected]: selected,
      [styles.hidden]: hidden,
      [styles.jump]: jump,
    })}
    style={{ "--base-color": buttonColor } as ButtonCSSProperties}
    disabled={disabled}
    {...events}
  >
    {amount !== undefined && (
      <div className={styles.amounts}>
        {amount !== undefined && `x${amount}`}
      </div>
    )}
    <div className={styles.portraitBox}>
      <div
        style={{ backgroundColor: portraitColor }}
        className={styles.portrait}
      >
        {label}
        {level !== undefined && <div className={styles.level}>{level}</div>}
        {children !== undefined && (
          <div className={styles.child}>{children}</div>
        )}
      </div>
    </div>
    {size !== undefined && <div className={styles.size}>{size}</div>}
  </button>
);
