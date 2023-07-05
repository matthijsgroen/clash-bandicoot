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

export const Grid: React.FC<
  PropsWithChildren<{
    width: number;
    height: number;
    onClick?: (pos: [x: number, y: number]) => void;
  }>
> = ({ width, height, children, onClick }) => {
  const fieldRef = useRef<HTMLDivElement>(null);

  const onClickHandler = useCallback<MouseEventHandler<HTMLDivElement>>(
    (e) => {
      if (!fieldRef.current) {
        return;
      }

      const fieldX = e.clientX + fieldRef.current.parentElement!.scrollLeft;
      const fieldY = e.clientY + fieldRef.current.parentElement!.scrollTop;

      const field = getComputedStyle(fieldRef.current);
      const width = parseFloat(field.width);
      const height = parseFloat(field.height);

      const tilesW = width / TILE_SIZE - OFFSET * 2;
      const tilesH = height / TILE_SIZE - OFFSET * 2;
      const pl = parseFloat(field.paddingLeft);
      const pt = parseFloat(field.paddingTop);
      const cx = pl + width / 2;
      const cy = pt + height / 2;

      const calcPos = ([x, y]: [x: number, y: number]): [
        x: number,
        y: number
      ] => {
        const rx = x / 1.5;

        const sw = rx - cx;
        const sh = y - cy;

        const dist = Math.sqrt(sw * sw + sh * sh);
        const angle = -45 * rad1 + Math.atan2(sh, sw);

        const sx = Math.cos(angle) * dist;
        const sy = Math.sin(angle) * dist;

        return [sx / TILE_SIZE + tilesW / 2, sy / TILE_SIZE + tilesH / 2];
      };

      onClick?.(calcPos([fieldX, fieldY]));
    },
    [onClick]
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

  return (
    <div className={styles.scrollContainer}>
      <div className={styles.rotationContainer} ref={fieldRef}>
        <div className={styles.tilted}>
          <div
            style={{
              width: width * TILE_SIZE,
              height: height * TILE_SIZE,
            }}
            className={styles.grid}
            onClick={onClickHandler}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
