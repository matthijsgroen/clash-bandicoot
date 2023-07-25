import { BattleEffectData } from "../../../engine/types";
import { Effect } from ".";

export const Effects: React.FC<{ effects: BattleEffectData }> = ({
  effects,
}) => {
  return (
    <>
      {Object.entries(effects)
        .filter(([, effect]) => effect.delay === 0)
        .map(([id, effect]) => (
          <Effect
            key={id}
            x={effect.position[0]}
            y={effect.position[1]}
            radius={effect.range}
            effectType={effect.type}
            state={effect.state}
          />
        ))}
    </>
  );
};
