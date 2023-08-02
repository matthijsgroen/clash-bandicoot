import classNames from "classnames";
import { CSSProperties, PropsWithChildren, createElement } from "react";
import styles from "./Text.module.css";

export type HTMLTextElement =
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "span"
  | "output";

export type TextSize = "default" | "small" | "large";

export const Text: React.FC<
  PropsWithChildren<{
    element?: HTMLTextElement;
    size?: TextSize;
    color?: CSSProperties["color"];
    skipOutline?: boolean;
    centered?: boolean;
    marginTop?: boolean;
    marginBottom?: boolean;
    className?: string;
  }>
> = ({
  element = "p",
  centered = false,
  className,
  size,
  children,
  color,
  skipOutline = false,
  marginTop = false,
  marginBottom = false,
}) =>
  createElement(
    element,
    {
      className: classNames(styles.text, {
        [styles.small]: size === "small",
        [styles.large]: size === "large",
        [styles.centered]: centered,
        [styles.outline]: !skipOutline,
        [styles.removeMarginTop]: !marginTop,
        [styles.removeMarginBottom]: !marginBottom,
        [className ?? ""]: className,
      }),
      ...(color ? { style: { "--text-color": color } } : {}),
    },
    children
  );
