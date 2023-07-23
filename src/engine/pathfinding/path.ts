import { ObstacleGrid, Path } from "./types";

const abs = Math.abs;

const interpolate = (
  [x0, y0]: [x: number, y: number],
  [x1, y1]: [x: number, b: number]
): Path => {
  const line: Path = [];
  let sx: number, sy: number, e2: number;

  const dx = abs(x1 - x0);
  const dy = abs(y1 - y0);

  sx = x0 < x1 ? 1 : -1;
  sy = y0 < y1 ? 1 : -1;

  let err = dx - dy; // slope function

  while (true) {
    line.push([x0, y0]);

    if (x0 === x1 && y0 === y1) {
      break;
    }

    e2 = 2 * err;
    if (e2 > -dy) {
      err = err - dy;
      x0 = x0 + sx;
    }
    if (e2 < dx) {
      err = err + dx;
      y0 = y0 + sy;
    }
  }

  return line;
};

export const simplifyPath = (path: Path, grid: ObstacleGrid): Path => {
  let len = path.length,
    x0 = path[0][0], // path start x
    y0 = path[0][1], // path start y
    x1 = path[len - 1][0], // path end x
    y1 = path[len - 1][1], // path end y
    coord: [number, number],
    line,
    testCoord;

  let sx = x0;
  let sy = y0;
  const newPath: Path = [[sx, sy]];

  for (let i = 2; i < len; ++i) {
    coord = path[i];
    line = interpolate([sx, sy], coord);

    let blocked = false;
    for (let j = 1; j < line.length; ++j) {
      testCoord = line[j];

      if (grid[testCoord[1]][testCoord[0]] !== 0) {
        blocked = true;
        break;
      }
    }
    if (blocked) {
      const lastValidCoord = path[i - 1];
      newPath.push(lastValidCoord);
      sx = lastValidCoord[0];
      sy = lastValidCoord[1];
    }
  }
  newPath.push([x1, y1]);

  return newPath;
};

export const roughPathLength = (path: Path) => {
  let cost = 0;
  for (let i = 1; i < path.length; ++i) {
    cost += Math.abs(path[i][0] - path[i - 1][0]);
    cost += Math.abs(path[i][1] - path[i - 1][1]);
  }
  return cost;
};
