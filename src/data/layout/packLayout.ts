import { buildingStore } from "../buildingStore";
import { BaseLayout } from "../types";
import { layoutBuilder } from "./baseLayout";
import { compressList } from "./compressList";

const EMPTY = compressList.indexOf("empty");

export const compressLayout = (layout: BaseLayout): number[] => {
  const result: number[] = [];
  const handled: boolean[][] = Array(layout.gridSize[0])
    .fill(null)
    .map(() => Array(layout.gridSize[1]).fill(false));

  result.push(Math.ceil(layout.gridSize[0] / 5));

  const getBuilding = (x: number, y: number) =>
    Object.values(layout.items).find(
      (b) => b.position[0] === x && b.position[1] === y
    );

  const countWalls = (
    level: number,
    horizontal: boolean,
    startX: number,
    startY: number
  ) => {
    let count = 1;
    let isWall = true;
    do {
      let checkX = horizontal ? startX + count : startX;
      let checkY = horizontal ? startY : startY + count;
      const building = getBuilding(checkX, checkY);
      isWall =
        (building &&
          building.info.type === "wall" &&
          building.info.level === level) ||
        false;
      if (isWall) count++;
    } while (isWall);
    return count;
  };

  let emptySpace = 0;

  for (let y = 0; y < layout.gridSize[1]; y++) {
    for (let x = 0; x < layout.gridSize[0]; x++) {
      if (handled[x][y]) continue;
      const building = getBuilding(x, y);
      if (building) {
        if (emptySpace > 0) {
          result.push(EMPTY, emptySpace);
          emptySpace = 0;
        }

        const buildingId = compressList.indexOf(building.info.type);

        if (buildingId === 2) {
          const horizontal = countWalls(building.info.level, true, x, y);
          const vertical = countWalls(building.info.level, false, x, y);
          if (horizontal > vertical) {
            result.push(15, building.info.level, horizontal);
            for (let hx = 0; hx < horizontal; hx++) {
              handled[x + hx][y] = true;
            }
            continue;
          }
          if (vertical > 1) {
            result.push(16, building.info.level, vertical);
            for (let hy = 0; hy < vertical; hy++) {
              handled[x][y + hy] = true;
            }
            continue;
          }
        }

        result.push(buildingId, building.info.level);

        for (let hy = 0; hy < building.info.size[1]; hy++) {
          for (let hx = 0; hx < building.info.size[0]; hx++) {
            handled[x + hx][y + hy] = true;
          }
        }
      } else {
        emptySpace++;
      }
      if (emptySpace === 255) {
        result.push(emptySpace);
        emptySpace = 0;
      }
    }
  }
  let lastTwo = result.slice(-2);
  while (lastTwo[0] === 0 || lastTwo[1] === 255) {
    if (lastTwo[0] === 0) {
      result.pop();
      result.pop();
    }
    if (lastTwo[1] === 255) {
      result.pop();
    }
    lastTwo = result.slice(-2);
  }

  return result;
};

// https://link.clashofclans.com/en?action=OpenLayout&id=TH4%3AHV%3AAAAAMAAAAAH9tvdlevbrUsisyYCPBE9n
// https://link.clashofclans.com/en?action=OpenLayout&id=TH10%3AWB%3AAAAASAAAAAGxgRlSQfEuWGtBHQoZv2rJ

export const packLayout = (compressedLayout: number[]): string => {
  const binString = Array.from(compressedLayout, (x) =>
    String.fromCodePoint(x)
  ).join("");
  let result = btoa(binString).replace(/\//g, "_").replace(/\+/g, "-");
  while (result.endsWith("=")) {
    result = result.slice(0, -1);
  }
  return result;
};

export const unpackLayout = (base64urlString: string): number[] => {
  const binString = atob(base64urlString.replace(/_/g, "/").replace(/-/g, "+"));
  const buffer = Uint8Array.from(
    binString as unknown as string[],
    (m) => m.codePointAt(0) ?? 0
  );
  return [...buffer];
};

export const decompressLayout = (buffer: [...number[]]): BaseLayout => {
  const gridSize = (buffer.shift() as number) * 5;
  const builder = layoutBuilder(gridSize, gridSize);

  const handled: boolean[][] = Array(gridSize)
    .fill(null)
    .map(() => Array(gridSize).fill(false));

  let emptySpace = 0;

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (handled[x][y]) continue;
      if (emptySpace > 0) {
        emptySpace--;
        continue;
      }

      const typeIndex = buffer.shift();
      if (typeIndex === 255) {
        emptySpace = 254;
        continue;
      }
      const levelOrLength = buffer.shift() ?? 1;
      if (typeIndex === 0) {
        emptySpace = levelOrLength - 1;
        continue;
      }
      if (typeIndex === undefined) {
        console.log("Building not found", typeIndex);
        return builder.result();
      }
      const type = compressList[typeIndex];
      if (type === "wallH") {
        const count = buffer.shift() ?? 1;

        for (let hx = 0; hx < count; hx++) {
          handled[x + hx][y] = true;
          builder.placeBuilding("wall", levelOrLength, [x + hx, y]);
        }
        continue;
      }
      if (type === "wallV") {
        const count = buffer.shift() ?? 1;

        for (let hy = 0; hy < count; hy++) {
          handled[x][y + hy] = true;
          builder.placeBuilding("wall", levelOrLength, [x, y + hy]);
        }
        continue;
      }
      if (type) {
        const building = buildingStore.getBuilding(type, levelOrLength);
        if (!building) {
          return builder.result();
        }
        builder.placeBuilding(type, levelOrLength, [x, y]);
        for (let hy = 0; hy < building.size[1]; hy++) {
          for (let hx = 0; hx < building.size[0]; hx++) {
            handled[x + hx][y + hy] = true;
          }
        }
      }
    }
  }

  return builder.result();
};
