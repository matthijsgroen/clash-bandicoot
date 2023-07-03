import React from "react";
import styles from "./Button.module.css";
import classnames from "classnames";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  color: "orange";
  square?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ color, square, ...props }, ref) => (
    <button
      type="button"
      ref={ref}
      {...props}
      className={classnames(styles.button, {
        [styles.orange]: color === "orange",
        [styles.square]: square,
      })}
    >
      {props.children}
    </button>
  )
);
