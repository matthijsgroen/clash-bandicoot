import classNames from "classnames";
import styles from "./Grid.module.css";
import React, {
  MouseEventHandler,
  PropsWithChildren,
  TouchEventHandler,
  useEffect,
  useRef,
} from "react";

export const OFFSET = 3;
export const TILE_SIZE = 15;
const rad1 = Math.PI / 180;

export type GridEventHandler<T> = (
  e: T,
  calcPos: (
    clientX: number,
    clientY: number,
    floored?: boolean
  ) => [gridX: number, gridY: number] | undefined
) => void;

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
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fieldRef.current || !fieldRef.current.parentElement) {
      return;
    }
    const scrollContainer = fieldRef.current.parentElement;
    const rect = scrollContainer.getBoundingClientRect();

    const scrollWidth = scrollContainer.scrollWidth;
    const scrollHeight = scrollContainer.scrollHeight;

    scrollContainer.scroll({
      top: scrollHeight / 2 - rect.height / 2,
      left: scrollWidth / 2 - rect.width / 2,
    });
  }, []);

  return (
    <div
      className={classNames(styles.scrollContainer, {
        [styles.scrollable]: scrollable,
      })}
    >
      <div className={styles.rotationContainer} ref={fieldRef}>
        <div className={styles.tilted}>
          <div
            style={{
              width: (width - OFFSET - OFFSET) * TILE_SIZE,
              height: (height - OFFSET - OFFSET) * TILE_SIZE,
            }}
            className={styles.grid}
            {...eventHandlers}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
