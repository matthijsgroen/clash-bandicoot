import React, { useEffect, useRef, useState } from "react";
import { layout as village, replay } from "./testScenarios/simpleVillage";
import { Village } from "./components/Village";
import { Replay, handleAttack } from "./data/attack";

const App = () => {
  const attack = useRef(handleAttack(village));
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
        const item = queue.placement.pop();
        if (item) {
          console.log("placing unit!", item.unit);
          attack.current.placeUnit(item.unit, item.level, item.position);
        }
      }

      setData({ ...attack.current.getData() });
    }, 20);

    return () => {
      clearInterval(int);
    };
  }, [attack]);

  const timeLeft = 3 * 60 * 1000 - data.timeSpent;
  return (
    <div>
      <main>
        <Village layout={village} attack={data} />
      </main>
      <aside>
        <p>
          Time:{" "}
          <output>
            {Math.floor(timeLeft / 1000 / 60)}:
            {`00${Math.floor(timeLeft / 1000) % 60}`.slice(-2)}
          </output>
        </p>
      </aside>
    </div>
  );
};

export default App;
