import classNames from "classnames";
import styles from "./CloudCurtain.module.css";
import { useEffect, useState } from "react";

export const CloudCurtain: React.FC<{ open?: boolean }> = ({ open = true }) => {
  const [clickThrough, setClickThrough] = useState(open);
  const [renderOpen, setRenderOpen] = useState(true);

  useEffect(() => {
    if (open) {
      const timeout = setTimeout(() => {
        setClickThrough(true);
      }, 800);
      return () => clearTimeout(timeout);
    } else {
      setClickThrough(false);
    }
  }, [open]);

  useEffect(() => {
    setRenderOpen(open);
  }, [open]);

  return (
    <div
      className={classNames(styles.layer, {
        [styles.open]: renderOpen,
        [styles.clickThrough]: clickThrough,
      })}
    ></div>
  );
};
