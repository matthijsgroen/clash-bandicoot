import { Army } from "../../engine/armyComposition";
import { Combat } from "./Combat";
import { CloudCurtain } from "../../ui-components/atoms/CloudCurtain";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Village, getBases } from "../../api/bases";

const SEARCH_DELAY = 900; // 800ms for animation, with 100ms wait in between

export const TargetSearch: React.FC<{ onClose?: VoidFunction; army: Army }> = ({
  onClose,
  army,
}) => {
  const [targetBase, setTargetBase] = useState<Village | null>(null);
  const [isSearching, setIsSearching] = useState(true);

  const [nextBase, setNextBase] = useState<Village | null | undefined>(
    undefined
  );

  const [targetIndex, setTargetIndex] = useState(0);

  const { data: targets } = useQuery({
    queryKey: ["villageList"],
    queryFn: getBases,
  });

  useEffect(() => {
    if (
      nextBase === undefined &&
      targetBase === null &&
      targets &&
      targets.length > 0
    ) {
      // InitialBaseSearch
      setNextBase(targets[targetIndex]);
    }
  }, [nextBase, targetBase, targets, targetIndex]);

  useEffect(() => {
    if (nextBase === targetBase && nextBase === null && !isSearching) {
      const timeout = setTimeout(() => {
        onClose?.();
      }, SEARCH_DELAY);
      return () => clearTimeout(timeout);
    }
    if (nextBase !== targetBase && !isSearching) {
      // transition to targetBase
      setIsSearching(true);
    }
    if (nextBase !== targetBase && nextBase !== undefined && isSearching) {
      const timeout = setTimeout(() => {
        setTargetBase(nextBase);
        setIsSearching(false);
      }, SEARCH_DELAY);
      return () => clearTimeout(timeout);
    }
  }, [nextBase, targetBase, isSearching, onClose]);

  // const [hasTarget, setHasTarget] = useState(false);
  // const [stopping, setStopping] = useState(false);
  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setTargetBase(targets[targetIndex]);
  //     setHasTarget(true);
  //   }, SEARCH_DELAY);
  //   return () => clearTimeout(timeout);
  // }, [targets, targetIndex]);

  // useEffect(() => {
  //   if (!hasTarget && targetBase && !stopping) {
  //     const timeout = setTimeout(() => {
  //       setTargetIndex((target) => (target + 1) % targets.length);
  //     }, SEARCH_DELAY);
  //     return () => clearTimeout(timeout);
  //   }
  // }, [hasTarget, targets, targetBase, stopping]);

  return (
    <>
      {targetBase && (
        <Combat
          base={targetBase.layout}
          army={army}
          onClose={() => {
            setNextBase(null);
          }}
          showNext={targets && targets.length > 1}
          onNext={() => {
            if (!targets) {
              setNextBase(null);
              return;
            }
            const nextTarget = (targetIndex + 1) % targets.length;
            setTargetIndex(nextTarget);
            setNextBase(targets[nextTarget]);
          }}
        />
      )}
      <CloudCurtain open={!isSearching} />
    </>
  );
};
