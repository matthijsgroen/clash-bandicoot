import { useAtomValue } from "jotai";
import { Effect } from "../../ui-components/composition/Village";
import { effectsAtom } from "../combatState";

export const Effects = () => {
  const effects = useAtomValue(effectsAtom);
  return (
    <>
      {effects.map(([id, effect]) => (
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
