export const createGrid = <T>(
  width: number,
  height: number,
  initialValue: T
): T[][] =>
  Array(height)
    .fill(0)
    .map(() => Array(width).fill(initialValue));
