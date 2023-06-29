import React, { useEffect, useRef, useState } from "react";
import { replay } from "../testScenarios/simpleVillage";
import { Village } from "./Village";
import { BaseLayout, Replay } from "../data/types";
import { handleAttack } from "../data/combat/attack";
import { Army } from "../data/armyComposition";
import styles from "./Combat.module.css";
import classNames from "classnames";

export const Combat: React.FC<{ base: BaseLayout; army: Army }> = ({
  base,
}) => {
  // const selectedTroop = useState<[string, number] | undefined>(undefined);
  const attack = useRef(handleAttack(base));
  const [data, setData] = useState(attack.current.getData());

  useEffect(() => {
    const queue: Replay = {
      placement: ([] as Replay["placement"]).concat(replay.placement),
    };
    console.log(queue);
    const int = setInterval(() => {
      attack.current.playTick();
      while (
        queue.placement.length > 0 &&
        attack.current.getData().timeSpent >= queue.placement[0].timestamp
      ) {
        const item = queue.placement.shift();
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
  return (
    <div>
      <main>
        <Village layout={base} attack={data} />
      </main>
      <aside>
        <p className={styles.timeRemaining}>
          <output>
            {Math.floor(timeLeft / 1000 / 60)}m{" "}
            {Math.floor(timeLeft / 1000) % 60}s
          </output>
        </p>
        <div className={styles.destruction}>
          <p>Destroyed:</p>
          <span
            className={classNames(
              { [styles.starCollected]: data.stars > 0 },
              styles.star
            )}
          >
            ★️
          </span>
          <span
            className={classNames(
              { [styles.starCollected]: data.stars > 1 },
              styles.star
            )}
          >
            ★️
          </span>
          <span
            className={classNames(
              { [styles.starCollected]: data.stars > 2 },
              styles.star
            )}
          >
            ★️
          </span>
          <output>{Math.floor(data.damage * 100)}%</output>
        </div>
      </aside>
    </div>
  );
};
