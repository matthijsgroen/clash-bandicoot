import {
  MouseEventHandler,
  PointerEventHandler,
  useCallback,
  useEffect,
  useRef,
} from "react";

export type Events = Omit<
  React.DOMAttributes<HTMLButtonElement>,
  "dangerouslySetInnerHTML" | "children"
>;

export const useLongPress = <T extends Events>(
  events: T,
  enabled: boolean
): T => {
  const timerRef = useRef<{
    triggered: number;
    timer?: ReturnType<typeof setInterval>;
  }>({ triggered: 0 });
  const onClick = events.onClick;

  useEffect(
    () => () => {
      clearInterval(timerRef.current.timer);
    },
    []
  );

  const onPointerDown: PointerEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault();
      clearInterval(timerRef.current.timer);
      timerRef.current.timer = setInterval(() => {
        timerRef.current.triggered++;
        onClick?.(e as unknown as React.MouseEvent<HTMLButtonElement>);
      }, 150);
    },
    [onClick]
  );

  const onPointerUp: PointerEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault();
      clearInterval(timerRef.current.timer);
      if (timerRef.current.triggered === 0) {
        onClick?.(e as unknown as React.MouseEvent<HTMLButtonElement>);
      }
    },
    [onClick]
  );
  const onContextMenu: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault();
    },
    []
  );

  if (!enabled || !events.onClick) {
    return events;
  }

  const augmentedEvents: T = {
    ...events,
    onPointerDown,
    onPointerUp,
    onContextMenu,
    onClick: undefined,
  };
  return augmentedEvents;
};
