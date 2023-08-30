import { BaseLayout, Position } from "../types";

export const findBuilding = (base: BaseLayout, position: Position) =>
  Object.values(base.items).find((element) => {
    const xOff = position[0] - element.position[0];
    const yOff = position[1] - element.position[1];
    return (
      xOff >= 0 &&
      xOff < element.info.size[0] &&
      yOff >= 0 &&
      yOff < element.info.size[1]
    );
  });
