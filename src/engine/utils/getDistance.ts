export const getDistance = (
  [x1, y1]: [x: number, y: number],
  [x2, y2]: [x: number, y: number]
) => Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
