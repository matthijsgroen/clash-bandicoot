import React, { useEffect, useRef, useState } from "react";
import { replay } from "../testScenarios/simpleVillage";
import { Village } from "./Village";
import { BaseLayout, Replay } from "../data/types";
import { handleAttack } from "../data/combat/attack";

export const Combat: React.FC<{ base: BaseLayout }> = ({ base }) => {
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
        <p>
          Time:{" "}
          <output>
            {Math.floor(timeLeft / 1000 / 60)}m{" "}
            {Math.floor(timeLeft / 1000) % 60}s
          </output>
        </p>
        <p>
          Destroyed: <output>{Math.floor(data.damage * 100)}%</output>
        </p>
        <p>
          Stars: <output>{data.stars}</output>
        </p>

        <p>Units:</p>
        <ol>
          {Object.entries(data.unitData).map(([id, data]) => {
            return (
              <li
                key={id}
                style={
                  data.info.hitPoints === 0
                    ? { textDecoration: "line-through", opacity: 0.5 }
                    : {}
                }
              >
                {data.info.type} lvl. {data.info.level}{" "}
                {Math.ceil(data.hitPoints)}
              </li>
            );
          })}
        </ol>
      </aside>
    </div>
  );
};
