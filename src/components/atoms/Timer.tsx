import classNames from "classnames";
import styles from "./Timer.module.css";

export const Timer: React.FC<{
  timeLeft: number;
  label?: string;
  className?: string;
}> = ({ timeLeft, label, className }) => {
  const minutesLeft = Math.floor(timeLeft / 1000 / 60);
  const secondsLeft = Math.floor(timeLeft / 1000) % 60;
  return (
    <div className={classNames(styles.timeRemaining, className)}>
      {label && <p>{label}</p>}
      <output
        className={classNames({
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
