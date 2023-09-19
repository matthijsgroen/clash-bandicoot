import { Dispatch, SetStateAction } from "react";
import { BaseLayout } from "../../engine/types";
import { Button } from "../../ui-components/atoms/Button";
import { VillageSelection } from "./types";
import { BuildingEditAction } from "../../data/types";
import { produce } from "immer";
import { buildingStore } from "../../data/buildingStore";

type ActionProps = {
  base: BaseLayout;
  updateBase: Dispatch<SetStateAction<BaseLayout>>;
  selection: VillageSelection;
};

const updateBaseAction =
  (buildingId: string, editAction: BuildingEditAction) =>
  (base: BaseLayout): BaseLayout => {
    if (editAction.mutation.mutationType === "changeType") {
      const level = base.items[buildingId].info.level;
      const newType = buildingStore.getBuilding(
        editAction.mutation.newType,
        level
      );
      if (newType) {
        return produce(base, (update) => {
          update.items[buildingId].info = newType;
        });
      }
    }
    return base;
  };

export const BuildingActions: React.FC<ActionProps> = ({
  base,
  updateBase,
  selection,
}) => {
  if (selection === null) return null;
  if (!("buildings" in selection)) return null;
  if (selection.buildings.length !== 1) return null;

  const buildingId = selection.buildings[0].id;
  const buildingInfo = base.items[buildingId];
  if ((buildingInfo.info.editActions ?? []).length === 0) return null;

  return (
    <>
      {buildingInfo.info.editActions?.map((action) => (
        <Button
          color="#F2E1D9"
          width="default"
          height="default"
          disabled={action.enabled?.(base)}
          onClick={() => {
            updateBase(updateBaseAction(buildingId, action));
          }}
        >
          {action.icon}
        </Button>
      ))}
    </>
  );
};
