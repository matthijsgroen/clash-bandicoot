import React, { useEffect, useRef, useState } from "react";
import styles from "./Combat.module.css";
import { BaseLayout, BattleState, Replay } from "../../engine/types";
import { handleAttack } from "../../engine/combat/attack";
import { Timer } from "../../ui-components/atoms/Timer";
import { Destruction } from "../../ui-components/atoms/Destruction";
import { ArmyControl } from "./ArmyControl";
import { PrimitiveAtom, useAtomValue, useSetAtom } from "jotai";
import { battleAtom, battleStateAtom } from "./combatState";
import {
  Grid,
  PlacementOutline,
  Building,
  Unit,
  Effect,
} from "../../ui-components/composition/Village";
import { Button } from "../../ui-components/atoms/Button";
import { calculateGridPosition } from "../../ui-components/composition/Village/Grid";
import { GridFloat } from "../../ui-components/composition/Village/GridFloat";
import { HealthBar } from "../../ui-components/atoms/HealthBar";
import { TroopType } from "../../data/types";
import { ButtonWithConfirm } from "../../ui-components/composition/ButtonWithConfirm";
import { colorMap } from "../consts/unitColors";
import { Army } from "../../engine/army/types";

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
  const battleState = useAtomValue(battleAtom);

  const building = battleState.layout.items[buildingId];

  const state = battleState.baseData[buildingId];
  const attacking = !state || state.state === "attacking";
  const visible = state?.visible ?? false;
  const destroyed = !state || state.hitPoints <= 0;

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

const CombatBuildingHealthBar: React.FC<{ buildingId: string }> = ({
  buildingId,
}) => {
  const battleState = useAtomValue(battleAtom);
  const position = battleState.layout.items[buildingId]?.position;
  const buildingState = battleState.baseData[buildingId];
  const visible =
    buildingState &&
    buildingState.lastHitAt !== -1 &&
    buildingState.lastHitAt > battleState.timeSpent - 3000 &&
    buildingState.hitPoints > 0;
  const health = buildingState
    ? buildingState.hitPoints / buildingState.building.info.hitPoints
    : 1;

  if (!position || !visible) {
    return null;
  }

  return (
    <GridFloat key={`health-${buildingId}`} x={position[0]} y={position[1]}>
      <HealthBar baseColor="royalblue" progress={health} />
    </GridFloat>
  );
};

const Effects: React.FC = () => (
  <>
    {Object.entries(useAtomValue(battleAtom).effectData).map(
      ([key, effectData]) => {
        if (effectData.delay > 0) return null;

        return (
          <Effect
            key={key}
            x={effectData.position[0]}
            y={effectData.position[1]}
            radius={effectData.range}
            effectType={effectData.type}
          />
        );
      }
    )}
  </>
);

const Units: React.FC = () => (
  <>
    {Object.entries(useAtomValue(battleAtom).unitData).map(([id, unitData]) => (
      <Unit
        key={id}
        x={unitData.position[0]}
        y={unitData.position[1]}
        unitType={unitData.info.type}
        state={unitData.state}
        unitMode={unitData.info.category}
        color={colorMap[unitData.type]}
      />
    ))}
  </>
);

const UnitHealthBars: React.FC = () => {
  const battleState = useAtomValue(battleAtom);
  return (
    <>
      {Object.entries(battleState.unitData).map(([unitId, unitState]) => {
        const visible =
          unitState &&
          unitState.lastHitAt !== -1 &&
          unitState.lastHitAt > battleState.timeSpent - 3000 &&
          unitState.hitPoints > 0;
        if (!visible) return null;

        const health = unitState.hitPoints / unitState.info.hitPoints;
        return (
          <GridFloat
            key={`health-${unitId}`}
            x={unitState.position[0]}
            y={unitState.position[1]}
          >
            <HealthBar baseColor="limegreen" progress={health} />
          </GridFloat>
        );
      })}
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
          <Effects />
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
            onClick={() => attack.current.stop()}
            confirmTitle="Surrender"
            confirmMessage="Chief, are you sure you want to give the order to retreat? Our army will be defeated!"
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
