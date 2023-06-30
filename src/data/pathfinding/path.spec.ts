import { simplifyPath } from "./path";
import { ObstacleGrid, Path } from "./types";

describe("simplifyPath", () => {
  const grid: ObstacleGrid = [
    [100, 0, 0, 0, 0],
    [0, -1, -1, -1, -1],
    [0, -1, 0, 0, 0],
    [0, 40, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];

  it("removes unneeded coordinates from the path", () => {
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
});
