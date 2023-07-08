import styles from "./VillageEditor.module.css";
import { BaseLayout } from "../engine/types";

export const VillageEditor: React.FC<{
  base: BaseLayout;
}> = ({ base }) => {
  return (
    <div className={styles.editor}>
      <main>{base.gridSize[0]}</main>
    </div>
  );
};
