import React, { CSSProperties } from "react";
import styles from "./Button.module.css";
import classNames from "classnames";

type ButtonCSSProperties = { "--color": string } & CSSProperties;

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  color: string;
  square?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ color, square, ...props }, ref) => (
    <button
      type="button"
      ref={ref}
      {...props}
      style={{ "--color": color } as ButtonCSSProperties}
      className={classNames(styles.button, {
        [styles.square]: square,
      })}
    >
      <div className={styles.outer}>
        <div className={styles.inner}>{props.children}</div>
      </div>
    </button>
  )
);
