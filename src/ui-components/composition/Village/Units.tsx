import { Unit } from ".";
import { BattleUnitData } from "../../../engine/types";

export const Units: React.FC<{ units: BattleUnitData }> = ({ units }) => (
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
