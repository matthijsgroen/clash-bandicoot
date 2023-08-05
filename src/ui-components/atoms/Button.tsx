import React, { CSSProperties } from "react";
import styles from "./Button.module.css";
import classNames from "classnames";

type ButtonCSSProperties = { "--color": string } & CSSProperties;

type ButtonSize = "tiny" | "small" | "default" | "large" | "huge";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  color: string;
  height?: ButtonSize;
  width?: ButtonSize;
  disabled?: boolean;
  pressed?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ color, height, width, pressed, className, ...props }, ref) => (
    <button
      type="button"
      ref={ref}
      {...props}
      style={{ "--color": color } as ButtonCSSProperties}
      className={classNames(styles.button, {
        [styles.tinyHeight]: height === "tiny",
        [styles.smallHeight]: height === "small",
        [styles.defaultHeight]: height === "default",
        [styles.largeHeight]: height === "large",
        [styles.hugeHeight]: height === "huge",

        [styles.tinyWidth]: width === "tiny",
        [styles.smallWidth]: width === "small",
        [styles.defaultWidth]: width === "default",
        [styles.largeWidth]: width === "large",
        [styles.hugeWidth]: width === "huge",
        [styles.pressed]: pressed,
        [className ?? ""]: className,
      })}
    >
      <div className={styles.outer}>
        <div className={styles.inner} aria-label={props.children?.toString()}>
          {props.children}
        </div>
      </div>
    </button>
  )
);
