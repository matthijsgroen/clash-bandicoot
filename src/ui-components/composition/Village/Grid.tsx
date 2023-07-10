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

  const calculatePosition = useCallback(
    (
      clientX: number,
      clientY: number
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

      return [
        sx / TILE_SIZE + tilesW / 2 + OFFSET,
        sy / TILE_SIZE + tilesH / 2 + OFFSET,
      ];
    },
    []
  );

  const onClickHandler = useCallback<MouseEventHandler<HTMLDivElement>>(
    (e) => {
      if (onClick) {
        const pos = calculatePosition(e.clientX, e.clientY);
        if (pos) onClick(pos);
      }
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
              width: (width - OFFSET - OFFSET) * TILE_SIZE,
              height: (height - OFFSET - OFFSET) * TILE_SIZE,
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
