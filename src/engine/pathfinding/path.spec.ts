import { simplifyPath } from "./path";
import { ObstacleGrid, Path } from "./types";

describe("simplifyPath", () => {
  it("removes unneeded coordinates from the path", () => {
    const grid: ObstacleGrid = [
      [100, 0, 0, 0, 0],
      [0, -1, -1, -1, -1],
      [0, -1, 0, 0, 0],
      [0, 40, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];

    const path: Path = [
      [3, 0],
      [2, 0],
      [1, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [1, 4],
      [2, 4],
      [3, 4],
      [4, 2],
    ];

    const result = simplifyPath(path, grid);
    expect(result).toEqual([
      [3, 0],
      [1, 0],
      [0, 1],
      [0, 3],
      [1, 4],
      [4, 2],
    ]);
  });

  it("keeps steps that are walls", () => {
    const grid: ObstacleGrid = [
      [100, 0, 0, 0, 0],
      [0, -1, -1, -1, -1],
      [1, -1, 0, 0, 0],
      [0, 40, 0, 0, 0],
      [0, 10, 0, 0, 0],
    ];

    const path: Path = [
      [3, 0],
      [2, 0],
      [1, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [1, 4],
      [2, 4],
      [3, 4],
      [4, 2],
    ];

    const result = simplifyPath(path, grid);
    expect(result).toEqual([
      [3, 0],
      [1, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [1, 4],
      [4, 2],
    ]);
  });

  it("keeps steps that are walls (2)", () => {
    const grid: ObstacleGrid = [
      [0, 0, 0, 0, 0],
      [20, 20, 20, 20, 20],
      [0, 0, 0, 0, 0],
      [0, 20, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];

    const path: Path = [
      [1, 4],
      [0, 3],
      [0, 2],
      [0, 1],
      [1, 0],
    ];

    const result = simplifyPath(path, grid);
    expect(result).toEqual([
      [1, 4],
      [0, 3],
      [0, 2],
      [0, 1],
      [1, 0],
    ]);
  });
});
