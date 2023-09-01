import { Combat } from "./Combat";
import { CloudCurtain } from "../../ui-components/atoms/CloudCurtain";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Village, getBases } from "../../api/bases";
import { getTownhallLevel } from "../../engine/layout/baseLayout";
import { useTargetTransition } from "./hooks/useTargetTransition";
import { ArmyItem } from "../../api/armies";

export const TargetSearch: React.FC<{
  armyItem: ArmyItem;
  onClose?: VoidFunction;
}> = ({ armyItem, onClose }) => {
  const { base, isSearching, setNextBase, isReady } =
    useTargetTransition<Village>();

  const [targetIndex, setTargetIndex] = useState(0);

  const { data } = useQuery({
    queryKey: ["villageList"],
    queryFn: getBases,
    networkMode: "always",
  });
  const targets = useMemo(
    () => (data ? data.filter((v) => getTownhallLevel(v.layout) !== 0) : []),
    [data]
  );

  useEffect(() => {
    if (base === undefined && targets.length > 0 && !isSearching) {
      // InitialBaseSearch
      setNextBase(targets[targetIndex]);
    }
  }, [base, targets, targetIndex, isSearching, setNextBase]);

  useEffect(() => {
    if (base === null && isReady) {
      onClose?.();
    }
  }, [base, isReady, onClose]);

  return (
    <>
      {base && armyItem && (
        <Combat
          base={base.layout}
          army={armyItem.army}
          onClose={() => {
            setNextBase(null);
          }}
          showNext={targets.length > 1}
          onNext={() => {
            const nextTarget = (targetIndex + 1) % targets.length;
            setTargetIndex(nextTarget);
            setNextBase(targets[nextTarget]);
          }}
        />
      )}
      <CloudCurtain open={!isSearching && base !== undefined} />
    </>
  );
};
