import { Position } from "../types";

export const shiftPosition = <T extends Position | undefined>(
  position: T,
  deltaX: number,
  deltaY: number
): T => {
  if (position === undefined) {
    return undefined as T;
  }
  return [position[0] + deltaX, position[1] + deltaY] as T;
};
