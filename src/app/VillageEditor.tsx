import styles from "./VillageEditor.module.css";
import { BaseLayout } from "../engine/types";
import {
  Buildings,
  Grid,
  PlacementOutline,
} from "../ui-components/composition/Village";
import { Button } from "../ui-components/atoms/Button";

export const VillageEditor: React.FC<{
  base: BaseLayout;
  onClose?: () => void;
}> = ({ base, onClose }) => {
  return (
    <div className={styles.editor}>
      <main>
        <Grid width={base.gridSize[0]} height={base.gridSize[1]}>
          <PlacementOutline mode="light" layout={base} />
          <Buildings showHidden layout={base} />
        </Grid>
        <div style={{ position: "absolute", top: "30dvh", left: "30dvw" }}>
          <p>Nothing to do here yet.</p>
          <Button onClick={onClose} color="orange">
            Go back
          </Button>
        </div>
      </main>
    </div>
  );
};
