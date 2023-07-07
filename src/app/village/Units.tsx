import { useAtomValue } from "jotai";
import { Unit } from "../../ui-components/composition/Village";
import { unitsAtom } from "../combatState";

export const Units = () => {
  const units = useAtomValue(unitsAtom);
  return (
    <>
      {units.map(([id, unit]) => (
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
