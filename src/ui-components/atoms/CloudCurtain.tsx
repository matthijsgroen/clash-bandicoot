import classNames from "classnames";
import styles from "./CloudCurtain.module.css";

export const CloudCurtain: React.FC<{ open?: boolean }> = ({ open }) => (
  <div className={classNames(styles.layer, { [styles.open]: open })}></div>
);
