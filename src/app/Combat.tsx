import React, { useEffect, useRef } from "react";
import styles from "./Combat.module.css";
import { Village } from "./Village";
import { BaseLayout, Replay } from "../data/types";
import { handleAttack } from "../data/combat/attack";
import { Army } from "../data/armyComposition";
import { Timer } from "../ui-components/atoms/Timer";
import { Destruction } from "../ui-components/atoms/Destruction";
import { ArmyControl } from "./ArmyControl";
import { useAtomValue, useSetAtom } from "jotai";
import { battleAtom } from "./combatState";

const CombatTimer = () => {
  const timeLeft = useAtomValue(battleAtom).timeLeft;
  return (
    <Timer
      timeLeft={timeLeft}
      label="Attack ends in:"
      className={styles.timer}
    />
  );
};

const DestructionMeter = () => {
  const data = useAtomValue(battleAtom);
  return (
    <Destruction
      damage={data.damage}
      stars={data.stars}
      className={styles.destruction}
    />
  );
};

export const Combat: React.FC<{
  base: BaseLayout;
  army: Army;
  replay?: Replay;
}> = ({ base, replay, army }) => {
  // const selectedTroop = useState<[string, number] | undefined>(undefined);
  const setBattleState = useSetAtom(battleAtom);
  const attack = useRef(handleAttack(base, army));

  const placementQueue = useRef<Replay>({
    placement: ([] as Replay["placement"]).concat(
      replay ? replay.placement : []
    ),
  });

  useEffect(() => {
    const int = setInterval(() => {
      if (attack.current.getData().state === "ended") {
        clearInterval(int);
        return;
      }

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
      setBattleState({ ...attack.current.getData() });
    }, 5);

    return () => {
      clearInterval(int);
    };
  }, [army, attack, setBattleState]);

  return (
    <div>
      <main>
        <Village />
      </main>
      <aside>
        <CombatTimer />
        <DestructionMeter />
      </aside>
      <ArmyControl />
    </div>
  );
};
