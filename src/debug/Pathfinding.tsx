import { createInitialBaseData } from "../data/combat/attack";
import { createGraph } from "../data/pathfinding/graph";
import { createObstacleGrid } from "../data/pathfinding/grid";
import { BaseLayout } from "../data/types";
import styles from "./Pathfinding.module.css";

export const PathFinding: React.FC<{ base: BaseLayout }> = ({ base }) => {
  const attackLayout = createInitialBaseData(base);
  const obstacleMap = createObstacleGrid(base, attackLayout);
  const graph = createGraph(obstacleMap);
  const start = graph.get(4, 4);
  if (start) {
    graph.open(start);
  }

  return (
    <div
      style={{
        width: `${base.gridSize[0] * 15}px`,
        height: `${base.gridSize[1] * 15}px`,
      }}
      className={styles.grid}
    >
      {obstacleMap.map((row, y) =>
        row.map((weight, x) => {
          return (
            <div
              key={`${x}-${y}`}
              style={{
                gridRow: y + 1,
                gridColumn: x + 1,
                fontSize: 10,
              }}
            >
              {weight !== 0 ? weight : ""}
            </div>
          );
        })
      )}
      {graph.openNodes.map((node) => (
        <div
          key={`${node.x}-${node.y}`}
          style={{
            gridRow: node.y + 1,
            gridColumn: node.x + 1,
            fontSize: 10,
            backgroundColor: "yellow",
          }}
        >
          {node.weight !== 0 ? node.weight : ""}
        </div>
      ))}
    </div>
  );
};
