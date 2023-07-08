import React, { useEffect, useRef, useState } from "react";
import styles from "./Combat.module.css";
import { BaseLayout, Replay } from "../engine/types";
import { handleAttack } from "../engine/combat/attack";
import { Army } from "../engine/armyComposition";
import { Timer } from "../ui-components/atoms/Timer";
import { Destruction } from "../ui-components/atoms/Destruction";
import { ArmyControl } from "./ArmyControl";
import { useAtom, useAtomValue } from "jotai";
import { battleAtom } from "./combatState";
import {
  Grid,
  PlacementOutline,
  Buildings,
  Effects,
} from "../ui-components/composition/Village";
import { Units } from "../ui-components/composition/Village/Units";

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
  const [selectedTroop, setSelectedTroop] = useState<
    [string, number] | undefined
  >(undefined);
  const [battleState, setBattleState] = useAtom(battleAtom);
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
    }, 20);

    return () => {
      clearInterval(int);
    };
  }, [army, attack, setBattleState]);

  const layout = battleState.layout;
  const buildingStatus = battleState.baseData;
  const units = battleState.unitData;

  return (
    <div className={styles.combat}>
      <main>
        <Grid
          width={layout.gridSize[0]}
          height={layout.gridSize[1]}
          onClick={(p) => {
            if (selectedTroop) {
              attack.current.placeUnit(selectedTroop[0], selectedTroop[1], p);
            }
          }}
        >
          <PlacementOutline mode="dark" layout={layout} />
          <Buildings layout={layout} battleBaseData={buildingStatus} />
          <Units units={units} />
          <Effects effects={battleState.effectData} />
        </Grid>
      </main>
      <aside>
        <CombatTimer />
        <DestructionMeter />
      </aside>
      <ArmyControl
        onSelect={(t, l) => setSelectedTroop([t, l])}
        selected={selectedTroop}
      />
    </div>
  );
};
