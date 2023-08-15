import classNames from "classnames";
import styles from "./Placeholder.module.css";

export const Placeholder: React.FC<{ size?: "large" }> = ({ size }) => (
  <div className={classNames(styles.empty, { [styles.large]: size })}></div>
);
