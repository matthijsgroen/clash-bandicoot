import styles from "./Grid.module.css";
import React, {
  MouseEventHandler,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
} from "react";

export const OFFSET = 3;
export const TILE_SIZE = 15;
const rad1 = Math.PI / 180;

export type GridMouseEventHandler = (
  e: React.MouseEvent<HTMLDivElement>,
  calcPos: (
    clientX: number,
    clientY: number,
    floored?: boolean
  ) => [gridX: number, gridY: number] | undefined
) => void;

export const Grid: React.FC<
  PropsWithChildren<{
    width: number;
    height: number;
    onClick?: GridMouseEventHandler;
    onMouseDown?: GridMouseEventHandler;
    onMouseUp?: GridMouseEventHandler;
    onMouseMove?: GridMouseEventHandler;
  }>
> = ({
  width,
  height,
  children,
  onClick,
  onMouseDown,
  onMouseUp,
  onMouseMove,
}) => {
  const fieldRef = useRef<HTMLDivElement>(null);

  const calculatePosition = useCallback(
    (
      clientX: number,
      clientY: number,
      floored = false
    ): [gridX: number, gridY: number] | undefined => {
      if (!fieldRef.current) {
        return;
      }

      const fieldX = clientX + fieldRef.current.parentElement!.scrollLeft;
      const fieldY = clientY + fieldRef.current.parentElement!.scrollTop;

      const field = getComputedStyle(fieldRef.current);
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
    },
    []
  );

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

  const onClickHandler = useCallback<MouseEventHandler<HTMLDivElement>>(
    (e) => {
      onClick && onClick(e, calculatePosition);
    },
    [onClick, calculatePosition]
  );

  const onMouseDownHandler = useCallback<MouseEventHandler<HTMLDivElement>>(
    (e) => {
      onMouseDown && onMouseDown(e, calculatePosition);
    },
    [onMouseDown, calculatePosition]
  );

  const onMouseUpHandler = useCallback<MouseEventHandler<HTMLDivElement>>(
    (e) => {
      onMouseUp && onMouseUp(e, calculatePosition);
    },
    [onMouseUp, calculatePosition]
  );

  const onMouseMoveHandler = useCallback<MouseEventHandler<HTMLDivElement>>(
    (e) => {
      onMouseMove && onMouseMove(e, calculatePosition);
    },
    [onMouseMove, calculatePosition]
  );

  return (
    <div className={styles.scrollContainer}>
      <div className={styles.rotationContainer} ref={fieldRef}>
        <div className={styles.tilted}>
          <div
            style={{
              width: (width - OFFSET - OFFSET) * TILE_SIZE,
              height: (height - OFFSET - OFFSET) * TILE_SIZE,
            }}
            className={styles.grid}
            onClick={onClickHandler}
            onMouseMove={onMouseMoveHandler}
            onMouseDown={onMouseDownHandler}
            onMouseUp={onMouseUpHandler}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
