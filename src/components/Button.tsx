import React from "react";
import styles from "./Button.module.css";

type ButtonProps = React.ComponentPropsWithoutRef<"button">;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => (
    <button type="button" ref={ref} {...props} className={styles.button}>
      {props.children}
    </button>
  )
);
