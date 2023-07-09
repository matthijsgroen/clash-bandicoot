import styles from "./VillageEditor.module.css";
import { BaseLayout } from "../engine/types";
import {
  Buildings,
  Grid,
  PlacementOutline,
} from "../ui-components/composition/Village";
import { Button } from "../ui-components/atoms/Button";
import {
  ArmyTray,
  Group,
  UnitButton,
} from "../ui-components/composition/ArmyTray";
import { buildingList } from "../engine/layout/compressList";
import { buildingStore } from "../data/buildingStore";
import { layoutBuilder } from "../engine/layout/baseLayout";

export const VillageEditor: React.FC<{
  base: BaseLayout;
  onClose?: () => void;
}> = ({ base: startBase, onClose }) => {
  const builder = layoutBuilder();
  builder.updateWithLayout(startBase);
  // builder.placeBuilding("townhall", 1, [20, 20]);
  const base = builder.result();

  const townHallLevel = Object.values(base.items).reduce(
    (r, e) => (e.info.type === "townhall" ? e.info.level : r),
    1
  );

  const typesAndAvailable: Record<string, number> = buildingList.reduce(
    (r, buildingType) => {
      const amountUsed = Object.values(base.items).reduce(
        (r, e) => (e.info.type === buildingType ? r + 1 : r),
        0
      );
      const amountAvailable =
        buildingStore.getMaxBuildingAmount(townHallLevel, buildingType) -
        amountUsed;

      if (amountAvailable > 0) {
        return {
          ...r,
          [buildingType]: amountAvailable,
        };
      }
      return r;
    },
    {} as Record<string, number>
  );

  return (
    <div className={styles.editor}>
      <main>
        <Grid width={base.gridSize[0]} height={base.gridSize[1]}>
          <PlacementOutline mode="light" layout={base} />
          <Buildings showHidden layout={base} />
        </Grid>
        <div className={styles.goBack}>
          <Button onClick={onClose} color="red">
            Go back
          </Button>
        </div>
      </main>
      <ArmyTray className={styles.placementControl}>
        <Group>
          {Object.entries(typesAndAvailable).map(([type, amount]) => (
            <UnitButton
              key={type}
              buttonColor="#bbf"
              portraitColor="#bbf"
              label={type}
              level={1}
              amount={amount}
            />
          ))}
        </Group>
      </ArmyTray>
    </div>
  );
};
