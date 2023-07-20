import classNames from "classnames";
import { PropsWithChildren, createElement } from "react";
import styles from "./Text.module.css";

export type HTMLTextElement = "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "span";
export type TextSize = "default" | "small";

export const Text: React.FC<
  PropsWithChildren<{
    element?: HTMLTextElement;
    size?: TextSize;
    className?: string;
  }>
> = ({ element = "p", className, size, children }) =>
  createElement(
    element,
    {
      className: classNames(styles.text, {
        [className ?? ""]: className,
        [styles.small]: size === "small",
      }),
    },
    children
  );
