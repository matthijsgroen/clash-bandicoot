import React, { useEffect, useRef, useState } from "react";
import { Village } from "./Village";
import { BaseLayout, Replay } from "../data/types";
import { handleAttack } from "../data/combat/attack";
import { Army } from "../data/armyComposition";
import styles from "./Combat.module.css";
import classNames from "classnames";

export const Combat: React.FC<{
  base: BaseLayout;
  army: Army;
  replay?: Replay;
}> = ({ base, replay, army }) => {
  // const selectedTroop = useState<[string, number] | undefined>(undefined);
  const attack = useRef(handleAttack(base));
  const [data, setData] = useState(attack.current.getData());
  const placementQueue = useRef<Replay>({
    placement: ([] as Replay["placement"]).concat(
      replay ? replay.placement : []
    ),
  });

  useEffect(() => {
    const int = setInterval(() => {
      attack.current.playTick();
      while (
        placementQueue.current.placement.length > 0 &&
        attack.current.getData().timeSpent >=
          placementQueue.current.placement[0].timestamp
      ) {
        const item = placementQueue.current.placement.shift();
        if (item) {
          console.log("placing unit!", item.unit);
          attack.current.placeUnit(item.unit, item.level, item.position);
        }
      }

      setData({ ...attack.current.getData() });
    }, 5);

    return () => {
      clearInterval(int);
    };
  }, [attack]);

  const timeLeft = Math.max(3 * 60 * 1000 - data.timeSpent, 0);
  const minutesLeft = Math.floor(timeLeft / 1000 / 60);
  const secondsLeft = Math.floor(timeLeft / 1000) % 60;
  return (
    <div>
      <main>
        <Village layout={base} attack={data} />
      </main>
      <aside>
        <div className={styles.timeRemaining}>
          <p>Time remaining till end of fight:</p>
          <output>
            {minutesLeft > 0 && `${minutesLeft}m `}
            {secondsLeft}s
          </output>
        </div>
        <div className={styles.destruction}>
          <p>Overall damage:</p>
          <span
            className={classNames(
              { [styles.starCollected]: data.stars > 0 },
              styles.star,
              styles.first
            )}
          >
            ★️
          </span>
          <span
            className={classNames(
              { [styles.starCollected]: data.stars > 1 },
              styles.star,
              styles.second
            )}
          >
            ★️
          </span>
          <span
            className={classNames(
              { [styles.starCollected]: data.stars > 2 },
              styles.star,
              styles.third
            )}
          >
            ★️
          </span>
          <output>{Math.floor(data.damage * 100)}%</output>
        </div>
      </aside>
      <aside className={styles.armyTray}></aside>
    </div>
  );
};
