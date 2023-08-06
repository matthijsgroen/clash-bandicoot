import classNames from "classnames";
import styles from "./Grid.module.css";
import React, {
  CSSProperties,
  MouseEventHandler,
  PropsWithChildren,
  TouchEventHandler,
} from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export const OFFSET = 3;
export const TILE_SIZE = 15;
const rad1 = Math.PI / 180;

type GridCSS = { "--width": number; "--height": number } & CSSProperties;

export type GridEventHandler<T> = (
  e: T,
  calcPos: (
    clientX: number,
    clientY: number,
    floored?: boolean
  ) => [gridX: number, gridY: number] | undefined
) => void;

export const getTouchPosition = (
  e: React.TouchEvent<HTMLElement>,
  floored = false
): [x: number, y: number] | undefined => {
  const mainTouch = e.touches[0];
  if (!mainTouch) {
    return undefined;
  }
  const element = document.elementFromPoint(
    mainTouch.clientX,
    mainTouch.clientY
  ) as HTMLElement | null;

  if (!element) {
    return;
  }

  const position = calculateGridPosition(
    element,
    mainTouch.clientX,
    mainTouch.clientY,
    floored
  );
  return position;
};

export const calculateGridPosition = (
  element: HTMLElement,
  clientX: number,
  clientY: number,
  floored = false
): [gridX: number, gridY: number] | undefined => {
  let rotationContainer = element.parentElement;
  while (
    rotationContainer &&
    !rotationContainer?.classList.contains(styles.rotationContainer)
  ) {
    rotationContainer = rotationContainer?.parentElement;
  }
  if (!rotationContainer) {
    return undefined;
  }

  const scrollContainer = rotationContainer.parentElement;

  const fieldX = clientX + (scrollContainer?.scrollLeft ?? 0);
  const fieldY = clientY + (scrollContainer?.scrollTop ?? 0);

  const field = getComputedStyle(rotationContainer);
  const width = parseFloat(field.width);
  const height = parseFloat(field.height);

  const tilesW = width / TILE_SIZE - OFFSET * 2;
  const tilesH = height / TILE_SIZE - OFFSET * 2;
  const pl = parseFloat(field.paddingLeft);
  const pt = parseFloat(field.paddingTop);
  const cx = pl + width / 2;
  const cy = pt + height / 2;

  const rx = fieldX / 1.5;

  const sw = rx - cx;
  const sh = fieldY - cy;

  const dist = Math.sqrt(sw * sw + sh * sh);
  const angle = -45 * rad1 + Math.atan2(sh, sw);

  const sx = Math.cos(angle) * dist;
  const sy = Math.sin(angle) * dist;

  const result: [x: number, y: number] = [
    sx / TILE_SIZE + tilesW / 2 + OFFSET,
    sy / TILE_SIZE + tilesH / 2 + OFFSET,
  ];
  return floored ? [Math.floor(result[0]), Math.floor(result[1])] : result;
};

export const Grid: React.FC<
  PropsWithChildren<{
    width: number;
    height: number;
    scrollable?: boolean;
    onClick?: MouseEventHandler<HTMLDivElement>;
    onMouseMove?: MouseEventHandler<HTMLDivElement>;
    onMouseDown?: MouseEventHandler<HTMLDivElement>;
    onMouseUp?: MouseEventHandler<HTMLDivElement>;

    onTouchStart?: TouchEventHandler<HTMLDivElement>;
    onTouchMove?: TouchEventHandler<HTMLDivElement>;
    onTouchEnd?: TouchEventHandler<HTMLDivElement>;
  }>
> = ({ width, height, scrollable = true, children, ...eventHandlers }) => {
  return (
    <div
      className={classNames(styles.scrollContainer, {
        [styles.scrollable]: scrollable,
      })}
    >
      <TransformWrapper
        centerOnInit
        centerZoomedOut
        maxScale={2.5}
        minScale={0.6}
      >
        <TransformComponent>
          <div
            style={
              {
                "--width": width,
                "--height": height,
              } as GridCSS
            }
            className={styles.boundingBox}
          >
            <div className={styles.rotationContainer}>
              <div className={styles.tilted}>
                <div className={styles.grid} {...eventHandlers}>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};
