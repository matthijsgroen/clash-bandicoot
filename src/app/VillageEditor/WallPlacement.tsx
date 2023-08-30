import { findBuilding } from "../../engine/layout/findBuilding";
import { getBuildingTypesAndAvailableAmount } from "../../engine/layout/typesAndAvailable";
import { BaseLayout, LayoutBuilding, Position } from "../../engine/types";
import { Building } from "../../ui-components/composition/Village";

export const WallPlacement: React.FC<{
  currentWall: LayoutBuilding;
  layout: BaseLayout;
}> = ({ currentWall, layout }) => {
  const typesAndAvailable = getBuildingTypesAndAvailableAmount(layout);
  const amountWallsLeft = typesAndAvailable["wall"];
  if (amountWallsLeft === 0) return null;
  const pos = currentWall.position;

  const positions: Position[] = [
    [pos[0], pos[1] - 1],
    [pos[0], pos[1] + 1],
    [pos[0] - 1, pos[1]],
    [pos[0] + 1, pos[1]],
  ];

  const availablePos = positions.filter(
    (p) =>
      p[0] > 2 &&
      p[0] < layout.gridSize[0] - 3 &&
      p[1] > 2 &&
      p[1] < layout.gridSize[1] - 3 &&
      !findBuilding(layout, p)
  );
  if (amountWallsLeft > 1) {
    availablePos.push(
      ...(
        [
          [pos[0], pos[1] - 2],
          [pos[0], pos[1] + 2],
          [pos[0] - 2, pos[1]],
          [pos[0] + 2, pos[1]],
        ] as Position[]
      ).filter(
        (p) =>
          p[0] > 2 &&
          p[0] < layout.gridSize[0] - 3 &&
          p[1] > 2 &&
          p[1] < layout.gridSize[1] - 3 &&
          !findBuilding(layout, p) &&
          !findBuilding(layout, [(p[0] + pos[0]) / 2, (p[1] + pos[1]) / 2])
      )
    );
  }

  return (
    <>
      {availablePos.map((p, i) => (
        <Building
          key={i}
          x={p[0]}
          y={p[1]}
          buildingType="wall"
          level={0}
          size={1}
        />
      ))}
    </>
  );
};
