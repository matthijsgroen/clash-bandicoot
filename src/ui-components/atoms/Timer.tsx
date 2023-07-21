import classNames from "classnames";
import styles from "./Timer.module.css";
import { Text } from "./Text";

export const Timer: React.FC<{
  timeLeft: number;
  label?: string;
  className?: string;
}> = ({ timeLeft, label, className }) => {
  const minutesLeft = Math.floor(timeLeft / 1000 / 60);
  const secondsLeft = Math.floor(timeLeft / 1000) % 60;
  const red = minutesLeft === 0 && secondsLeft < 30 && secondsLeft % 2 === 1;
  return (
    <div
      className={classNames(styles.timeRemaining, className, {
        [styles.red]: red,
      })}
    >
      {label && (
        <Text size="small" centered>
          {label}
        </Text>
      )}
      <Text element="output" size="large" centered>
        {minutesLeft > 0 && `${minutesLeft}m `}
        {secondsLeft}s
      </Text>
    </div>
  );
};
