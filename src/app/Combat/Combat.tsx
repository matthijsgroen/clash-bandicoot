import React, { useEffect, useRef, useState } from "react";
import styles from "./Combat.module.css";
import { BaseLayout, Replay } from "../../engine/types";
import { handleAttack } from "../../engine/combat/attack";
import { Army } from "../../engine/armyComposition";
import { Timer } from "../../ui-components/atoms/Timer";
import { Destruction } from "../../ui-components/atoms/Destruction";
import { ArmyControl } from "./ArmyControl";
import { useAtom, useAtomValue } from "jotai";
import { battleAtom } from "./combatState";
import {
  Grid,
  PlacementOutline,
  Buildings,
  Effects,
} from "../../ui-components/composition/Village";
import { Units } from "../../ui-components/composition/Village/Units";
import { Button } from "../../ui-components/atoms/Button";
import { calculateGridPosition } from "../../ui-components/composition/Village/Grid";

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
  showNext?: boolean;
  onClose?: VoidFunction;
  onNext?: VoidFunction;
}> = ({ base, replay, army, showNext = false, onClose, onNext }) => {
  const [selectedTroop, setSelectedTroop] = useState<
    [string, number] | undefined
  >(undefined);

  const [battleState, setBattleState] = useAtom(battleAtom);
  const attack = useRef(handleAttack(base, army));
  const [battleStarted, setBattleStarted] = useState(false);

  const placementQueue = useRef<Replay>({
    placement: ([] as Replay["placement"]).concat(
      replay ? replay.placement : []
    ),
  });

  useEffect(() => {
    attack.current = handleAttack(base, army);
    setBattleState({ ...attack.current.getData() });
  }, [base, army, setBattleState]);

  useEffect(() => {
    if (!battleStarted) {
      setBattleState({ ...attack.current.getData() });
      return;
    }

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
          attack.current.placeUnit(item.unit, item.level, item.position);
        }
      }
      setBattleState({ ...attack.current.getData() });
    }, 20);

    return () => {
      clearInterval(int);
    };
  }, [army, attack, setBattleState, battleStarted]);

  const layout = battleState.layout;
  const buildingStatus = battleState.baseData;
  const units = battleState.unitData;

  return (
    <div className={styles.combat}>
      <main>
        <Grid
          width={layout.gridSize[0]}
          height={layout.gridSize[1]}
          onClick={(e) => {
            if (selectedTroop) {
              const position = calculateGridPosition(
                e.currentTarget,
                e.clientX,
                e.clientY
              );
              if (position) {
                setBattleStarted(true);
                attack.current.placeUnit(
                  selectedTroop[0],
                  selectedTroop[1],
                  position
                );
              }
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
        {battleStarted && (
          <>
            <CombatTimer />
            <DestructionMeter />
          </>
        )}
        {!battleStarted && showNext && (
          <Button
            color="orange"
            width="huge"
            height="default"
            className={styles.nextTarget}
            onClick={onNext}
          >
            Next target &raquo;
          </Button>
        )}

        <Button
          color="red"
          width="default"
          height="small"
          className={styles.stop}
          onClick={onClose}
        >
          {battleStarted ? "Surrender" : "Stop"}
        </Button>
        {battleState.state === "ended" && (
          <div style={{ position: "absolute", left: "30dvw", top: "30dvh" }}>
            <p>Yay combat is done!</p>
            <Button
              onClick={onClose}
              color="orange"
              height="default"
              width="huge"
            >
              Go Back
            </Button>
          </div>
        )}
      </aside>
      <ArmyControl
        onSelect={(t, l) => setSelectedTroop([t, l])}
        selected={selectedTroop}
      />
    </div>
  );
};
