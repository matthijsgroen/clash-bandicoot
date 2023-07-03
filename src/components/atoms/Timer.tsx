import classnames from "classnames";
import styles from "./Timer.module.css";

export const Timer: React.FC<{ timeLeft: number; label?: string }> = ({
  timeLeft,
  label,
}) => {
  const minutesLeft = Math.floor(timeLeft / 1000 / 60);
  const secondsLeft = Math.floor(timeLeft / 1000) % 60;
  return (
    <div className={styles.timeRemaining}>
      {label && <p>{label}</p>}
      <output
        className={classnames({
          [styles.red]:
            minutesLeft === 0 && secondsLeft < 30 && secondsLeft % 2 === 1,
        })}
      >
        {minutesLeft > 0 && `${minutesLeft}m `}
        {secondsLeft}s
      </output>
    </div>
  );
};
