import classNames from "classnames";
import styles from "./Destruction.module.css";

export const Destruction: React.FC<{ damage: number; stars: number }> = ({
  damage,
  stars,
}) => (
  <div className={styles.destruction}>
    <p>Overall damage:</p>
    <span
      className={classNames(
        { [styles.starCollected]: stars > 0 },
        styles.star,
        styles.first
      )}
    >
      ★️
    </span>
    <span
      className={classNames(
        { [styles.starCollected]: stars > 1 },
        styles.star,
        styles.second
      )}
    >
      ★️
    </span>
    <span
      className={classNames(
        { [styles.starCollected]: stars > 2 },
        styles.star,
        styles.third
      )}
    >
      ★️
    </span>
    <output>{Math.floor(damage * 100)}%</output>
  </div>
);
