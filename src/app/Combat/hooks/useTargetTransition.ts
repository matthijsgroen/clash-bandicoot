import { useEffect, useState } from "react";

const SEARCH_DELAY = 900; // 800ms for animation, with 100ms wait in between

export const useTargetTransition = <T>() => {
  const [targetBase, setTargetBase] = useState<T | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const [nextBase, setNextBase] = useState<T | null | undefined>(undefined);

  useEffect(() => {
    if (nextBase !== targetBase && nextBase !== undefined && !isSearching) {
      setIsSearching(true);
      setIsReady(false);
    }
    if (nextBase !== targetBase && nextBase !== undefined && isSearching) {
      const timeout = setTimeout(() => {
        setTargetBase(nextBase);
        setIsSearching(false);
      }, SEARCH_DELAY);
      return () => {
        clearTimeout(timeout);
      };
    }
    if (nextBase === targetBase && isSearching === false) {
      const readyTimeout = setTimeout(() => {
        setIsReady(true);
      }, SEARCH_DELAY);
      return () => {
        clearTimeout(readyTimeout);
      };
    }
  }, [nextBase, targetBase, isSearching]);

  const base = nextBase === undefined ? undefined : targetBase;

  return { base, isSearching, isReady, setNextBase };
};
