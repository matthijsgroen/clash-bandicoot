export const getDistance = (
  a: [x: number, y: number],
  b: [x: number, y: number]
) => Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
