import React, { useEffect, useRef, useState } from "react";
import styles from "./Combat.module.css";
import { Village } from "./Village";
import { BaseLayout, Replay } from "../data/types";
import { handleAttack } from "../data/combat/attack";
import { Army } from "../data/armyComposition";
import { Timer } from "../components/atoms/Timer";
import { Destruction } from "../components/atoms/Destruction";
import { ArmyControl } from "./ArmyControl";

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
  return (
    <div>
      <main>
        <Village layout={base} attack={data} />
      </main>
      <aside>
        <Timer
          timeLeft={timeLeft}
          label="Attack ends in:"
          className={styles.timer}
        />
        <Destruction
          damage={data.damage}
          stars={data.stars}
          className={styles.destruction}
        />
      </aside>
      <ArmyControl army={army} />
    </div>
  );
};
