import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Combat.module.css";
import { BaseLayout, BattleState, Replay } from "../../engine/types";
import { handleAttack } from "../../engine/combat/attack";
import { Army } from "../../engine/armyComposition";
import { Timer } from "../../ui-components/atoms/Timer";
import { Destruction } from "../../ui-components/atoms/Destruction";
import { ArmyControl } from "./ArmyControl";
import { PrimitiveAtom, atom, useAtomValue, useSetAtom } from "jotai";
import { battleAtom, battleStateAtom } from "./combatState";
import {
  Grid,
  PlacementOutline,
  // Effects,
  Building,
  Unit,
} from "../../ui-components/composition/Village";
import { Button } from "../../ui-components/atoms/Button";
import { calculateGridPosition } from "../../ui-components/composition/Village/Grid";
import { GridFloat } from "../../ui-components/composition/Village/GridFloat";
import { HealthBar } from "../../ui-components/atoms/HealthBar";
import { TroopType } from "../../data/types";
import { ButtonWithConfirm } from "../../ui-components/composition/ButtonWithConfirm";

const CombatTimer: React.FC<{ battleAtom: PrimitiveAtom<BattleState> }> = ({
  battleAtom,
}) => {
  const timeLeft = useAtomValue(battleAtom).timeLeft;
  return (
    <Timer
      timeLeft={timeLeft}
      label="Attack ends in:"
      className={styles.timer}
    />
  );
};

const DestructionMeter: React.FC<{
  battleAtom: PrimitiveAtom<BattleState>;
}> = ({ battleAtom }) => {
  const data = useAtomValue(battleAtom);
  return (
    <Destruction
      damage={data.damage}
      stars={data.stars}
      className={styles.destruction}
    />
  );
};

const CombatBuilding: React.FC<{
  buildingId: string;
}> = ({ buildingId }) => {
  const stateAtoms = useMemo(
    () => ({
      building: atom((get) => get(battleAtom).layout.items[buildingId]),
      visible: atom(
        (get) => get(battleAtom).baseData[buildingId]?.visible ?? false
      ),
      destroyed: atom((get) => {
        const state = get(battleAtom).baseData[buildingId];
        return !state || state.hitPoints <= 0;
      }),
      attacking: atom((get) => {
        const state = get(battleAtom).baseData[buildingId];
        return !state || state.state === "attacking";
      }),
    }),
    [buildingId]
  );
  const building = useAtomValue(stateAtoms.building);
  const attacking = useAtomValue(stateAtoms.attacking);
  const destroyed = useAtomValue(stateAtoms.destroyed);
  const visible = useAtomValue(stateAtoms.visible);

  if (!building || !visible) {
    return null;
  }

  return (
    <Building
      key={buildingId}
      x={building.position[0]}
      y={building.position[1]}
      buildingType={building.info.type}
      level={building.info.level}
      size={building.info.size[0]}
      attacking={attacking}
      destroyed={destroyed}
    />
  );
};

export const CombatBuildingHealthBar: React.FC<{ buildingId: string }> = ({
  buildingId,
}) => {
  const stateAtoms = useMemo(
    () => ({
      position: atom(
        (get) => get(battleAtom).layout.items[buildingId]?.position
      ),
      visible: atom((get) => {
        const battleState = get(battleAtom);
        const buildingState = battleState.baseData[buildingId];
        return (
          buildingState &&
          buildingState.lastHitAt !== -1 &&
          buildingState.lastHitAt > battleState.timeSpent - 3000 &&
          buildingState.hitPoints > 0
        );
      }),
      health: atom((get) => {
        const battleState = get(battleAtom);
        const buildingState = battleState.baseData[buildingId];
        if (!buildingState) return 1;
        return buildingState.hitPoints / buildingState.building.info.hitPoints;
      }),
    }),
    [buildingId]
  );
  const position = useAtomValue(stateAtoms.position);
  const visible = useAtomValue(stateAtoms.visible);
  const health = useAtomValue(stateAtoms.health);

  if (!position || !visible) {
    return null;
  }
  return (
    <GridFloat key={`health-${buildingId}`} x={position[0]} y={position[1]}>
      <HealthBar baseColor="royalblue" progress={health} />
    </GridFloat>
  );
};

export const Units: React.FC = () => {
  const units = useAtomValue(battleAtom).unitData;
  return (
    <>
      {Object.entries(units).map(([id, unit]) => (
        <Unit
          key={id}
          x={unit.position[0]}
          y={unit.position[1]}
          unitType={unit.info.type}
          state={unit.state}
        />
      ))}
    </>
  );
};

export const UnitHealthBars: React.FC = () => {
  const battleState = useAtomValue(battleAtom);
  return (
    <>
      {Object.entries(battleState.unitData)
        .filter(
          ([, s]) =>
            s.lastHitAt !== -1 &&
            s.lastHitAt > battleState.timeSpent - 3000 &&
            s.hitPoints > 0
        )
        .map(([id, unit]) => (
          <GridFloat
            key={`health-${id}`}
            x={unit.position[0]}
            y={unit.position[1]}
          >
            <HealthBar
              baseColor="limegreen"
              progress={unit.hitPoints / unit.info.hitPoints}
            />
          </GridFloat>
        ))}
    </>
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
    [TroopType, number] | undefined
  >(undefined);

  const setBattleState = useSetAtom(battleAtom);
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

  const battleState = useAtomValue(battleStateAtom);

  const buildingKeys = Object.keys(base.items);

  return (
    <div className={styles.combat}>
      <main>
        <Grid
          width={base.gridSize[0]}
          height={base.gridSize[1]}
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
          <PlacementOutline mode="dark" layout={base} />
          {buildingKeys.map((key) => (
            <CombatBuilding buildingId={key} key={key} />
          ))}
          <Units />
          {/* <Effects effects={battleState.effectData} /> */}
          <UnitHealthBars />
          {buildingKeys.map((key) => (
            <CombatBuildingHealthBar buildingId={key} key={key} />
          ))}
        </Grid>
      </main>
      <aside>
        {battleStarted && (
          <>
            <CombatTimer battleAtom={battleAtom} />
            <DestructionMeter battleAtom={battleAtom} />
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

        {battleState !== "ended" && battleStarted && (
          <ButtonWithConfirm
            color="red"
            width="large"
            height="small"
            className={styles.stop}
            onClick={onClose}
            confirmTitle="Surrender"
            confirmMessage="Something!"
          >
            Surrender
          </ButtonWithConfirm>
        )}
        {battleState !== "ended" && !battleStarted && (
          <Button
            color="red"
            width="large"
            height="small"
            className={styles.stop}
            onClick={onClose}
          >
            Stop
          </Button>
        )}
        {battleState === "ended" && (
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
